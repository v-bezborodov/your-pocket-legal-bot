import type { ValidationResult } from "../entities/ValidationResult";
import type { Filter } from "../services/BaseFilter.ts";

export class FilterPipeline {
  private filters: Filter[];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  public async run(input: { id: string; text: string; timestamp: number }): Promise<ValidationResult> {
    for (const filter of this.filters) {
      const result = await filter(input);
      if (!result.isRelevant) return result; // short-circuit at first failed filter
    }
    return { isRelevant: true };
  }
}
