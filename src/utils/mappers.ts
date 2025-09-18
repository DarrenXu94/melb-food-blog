import type { Review, ReviewProperties } from "../types/blog";
import type {
  Category,
  CategoryOption,
  GetCategoriesResponse,
  ReviewDatabaseRow,
} from "../types/notion";
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

export const categoriesToOptions = (res: GetCategoriesResponse) => {
  return res.reduce((acc, category: Category) => {
    acc[toCamelCaseAndRemoveSpecialChars(category.name)] = {
      type: category.type,
      options: category.options.map((option) => ({
        name: option.name,
        id: option.id,
        color: option.color,
      })),
    };
    return acc;
  }, {} as Record<string, { type: string; options: CategoryOption[] }>);
};
