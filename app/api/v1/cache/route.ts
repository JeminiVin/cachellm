import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getEmbedding } from '@/lib/vector';
import { Index } from '@upstash/vector';

// Initialize Upstash Vector Client
const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate via Bearer API Key
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
    }

    const secretKey = authHeader.split(' ')[1];

    // Validate API key in Database
    const apiKeyRecord = await db.apiKey.findUnique({
      where: { key_secret: secretKey },
    });

    if (!apiKeyRecord) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    }

    // 2. Parse request body (Prompt / Query)
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 3. Generate Local Embedding for the query (384 dimensions)
    const queryEmbedding = await getEmbedding(prompt);

    // 4. Query Upstash Vector DB for semantic similarity
    const searchResults = await vectorIndex.query({
      vector: queryEmbedding,
      topK: 1,
      includeMetadata: true,
    });

    // Similarity threshold (e.g., 0.85+ means semantic match)
    const SIMILARITY_THRESHOLD = 0.85;

    if (searchResults.length > 0 && searchResults[0].score >= SIMILARITY_THRESHOLD) {
      // CACHE HIT! 🎯
      const cachedData = searchResults[0].metadata as { response: string };

      return NextResponse.json({
        source: 'cache',
        similarity: searchResults[0].score,
        response: cachedData.response,
      });
    }

    // 5. CACHE MISS! ❌ Call Gemini API
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const generatedText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    // 6. Save new embedding & response to Upstash Vector for future matches
    const vectorId = `cache_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`; await vectorIndex.upsert({
      id: vectorId,
      vector: queryEmbedding,
      metadata: { prompt, response: generatedText },
    });

    return NextResponse.json({
      source: 'gemini_llm',
      similarity: searchResults.length > 0 ? searchResults[0].score : 0,
      response: generatedText,
    });
  } catch (error: any) {
    console.error('Cache API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}