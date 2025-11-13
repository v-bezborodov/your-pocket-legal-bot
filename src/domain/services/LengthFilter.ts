import type{ Filter } from "./BaseFilter";


export const lengthFilter: Filter = async (input) => {
    if (input.text.trim().length < 5) {
      return { isRelevant: false, reason: "Too short" };
    }
    return { isRelevant: true };
  };
  