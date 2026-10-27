import { pipeline } from '@xenova/transformers';

let featureExtractor: any = null;

export async function getEmbedding(text: string): Promise<number[]> {
  if (!featureExtractor) {
    featureExtractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const output = await featureExtractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}