import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user found' }, { status: 401 });
    }

    const secretKey = `sk_cache_${crypto.randomBytes(16).toString('hex')}`;

    // Note: Check prisma/schema.prisma if your model is ApiKey or apiKey or APIKey.
    // In standard Prisma schema: db.apiKey or db.aPIKey
    const apiKeyModel = (db as any).apiKey || (db as any).aPIKey;

    if (!apiKeyModel) {
      throw new Error('ApiKey model not found on Prisma Client instance.');
    }

    const newApiKey = await apiKeyModel.create({
      data: {
        user_id: userId,
        key_secret: secretKey,
        name: 'Default API Key',
      },
    });

    return NextResponse.json({ apiKey: newApiKey.key_secret }, { status: 200 });
  } catch (error: any) {
    console.error('=== FULL API KEY ROUTE ERROR ===\n', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}