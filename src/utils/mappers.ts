import type { Review, ReviewProperties } from "../types/blog";
import type { ReviewDatabaseRow } from "../types/notion";
import { toCamelCaseAndRemoveSpecialChars } from "./string";

export const reviewDbRowToObject = (row: ReviewDatabaseRow): Review => {
  const properties = row.properties.reduce((acc, prop) => {
    acc[toCamelCaseAndRemoveSpecialChars(prop.name)] = prop.value;
    return acc;
  }, {} as Record<string, any>);

  return {
    id: row.id,
    created_time: row.created_time,
    properties: properties as ReviewProperties,
  };
};
