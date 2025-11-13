import type { Filter } from "./BaseFilter";

const blockedPatterns = [/buy now/i, /free money/i, /http/i];

export const spamFilter: Filter = async (input) => {
  const isSpam = blockedPatterns.some(p => p.test(input.text));
  return isSpam
    ? { isRelevant: false, reason: "Spam detected" }
    : { isRelevant: true };
};
