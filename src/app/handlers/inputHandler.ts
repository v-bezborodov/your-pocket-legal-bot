import { FilterPipeline } from "../../domain/usecases/FilterPipeline.ts";
import { lengthFilter } from "../../domain/services/LengthFilter.ts";
import { spamFilter } from "../../domain/services/SpamFilter.ts";
import { semanticFilter } from "../../domain/services/SemanticSimilarityFilter.ts";
import type { ValidationResult } from "../../domain/entities/ValidationResult";
// import { intentFilter } from "../../domain/services/IntentFilter";

const pipeline = new FilterPipeline([
  lengthFilter,
  spamFilter,
  // semanticFilter,
  // intentFilter,
]);

export async function handleInput(rawText: string):Promise<ValidationResult> {
  const input = { id: "1", text: rawText, timestamp: Date.now() };
  const result = await pipeline.run(input);

  if (!result.isRelevant) {
    console.warn(`Ignored: ${result.reason}`);
    // return;
  } else {
    console.log("✅ Input passed all filters!");
  }
  
  return result
}
