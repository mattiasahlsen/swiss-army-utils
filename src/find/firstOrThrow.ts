import { indexOrThrow } from "./indexOrThrow.js";

export const firstOrThrow = <T>(items: T[]): T => indexOrThrow(items, 0);
