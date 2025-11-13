import type { UserInput } from "../entities/UserInput";
import type { ValidationResult } from "../entities/ValidationResult";


export type Filter = (input: UserInput) => Promise<ValidationResult>;