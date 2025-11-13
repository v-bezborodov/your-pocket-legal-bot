import { getEmbeddingSimilarity } from "../../infrastructure/ai/embeddingService.ts";
import type { Filter } from "./BaseFilter";


const relevantExamples = ["How to manage invoices?", "Show transaction history"];

export const semanticFilter: Filter = async (input) => {
  const similarity = await getEmbeddingSimilarity(input.text, relevantExamples);
  
  if (similarity === null) {
    // Embedding failed — likely rate-limited or API error
    return {
      isRelevant: false,
      reason:
        "Наразі сервер перевантажений або недоступний. Будь ласка, спробуйте пізніше або зверніться до адміністратора.",
    };
  }

  return similarity < 0.7
    ? { isRelevant: false, reason: "Low semantic similarity" }
    : { isRelevant: true };
};
