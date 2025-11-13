import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getEmbeddingSimilarity(
  text: string,
  examples: string[]
): Promise<number | null> {
  try {
    const [inputEmb, exampleEmb] = await Promise.all([
      client.embeddings.create({ model: "text-embedding-3-small", input: text }),
      client.embeddings.create({ model: "text-embedding-3-small", input: examples.join("\n") }),
    ]);

    // simple cosine similarity stub
    const dot = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0);
    const norm = (a: number[]) => Math.sqrt(dot(a, a));
    const sim =
      dot(inputEmb.data[0].embedding, exampleEmb.data[0].embedding) /
      (norm(inputEmb.data[0].embedding) * norm(exampleEmb.data[0].embedding));

    return sim;
  } catch (err: any) {
    if (err.status === 429) {
      console.warn("⚠️ OpenAI rate limit hit — skipping semantic filter.");
      return null; // gracefully continue
    }

    console.error("❌ Error in embeddingService:", err);
    return null;
  }
}
