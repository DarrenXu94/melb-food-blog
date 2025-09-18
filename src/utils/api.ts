/**
 * API utilities for fetching data from Netlify functions
 * These functions will be used to integrate with your Notion database
 */

import type {
  ReviewDatabaseRow,
  GetAllReviewsResponse,
  GetCategoriesResponse,
  GetReviewResponse,
  ErrorResponse,
} from "../types/notion";

const API_BASE_URL = import.meta.env.NETLIFY_API_BASE_URL;

/**
 * Fetch all reviews from the Notion database
 */
export async function getAllReviews(): Promise<GetAllReviewsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/getAllReviews`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

/**
 * Fetch categories from the Notion database
 */
export async function getCategories(): Promise<GetCategoriesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/getCategories`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * Fetch a specific review as markdown from Notion page ID
 */
export async function getMarkdownFromReview(
  pageId: string
): Promise<GetReviewResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getMarkdownFromReview?pageId=${encodeURIComponent(
        pageId
      )}`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
}

/**
 * Helper function to transform Notion data into our review format
 */
export function transformNotionReview(notionReview: ReviewDatabaseRow): any {
  const properties = notionReview.properties.reduce((acc, prop) => {
    acc[prop.name.toLowerCase()] = prop.value;
    return acc;
  }, {} as Record<string, any>);

  return {
    id: notionReview.id,
    title: properties.title || "Untitled Review",
    rating: parseFloat(properties.rating) || 0,
    cuisine: properties.cuisine || "",
    location: properties.location || "",
    price: properties.price || "",
    image: properties.image || "",
    href: `/reviews/${notionReview.id}`,
    created_time: notionReview.created_time,
  };
}

/**
 * Helper function to filter reviews based on search criteria
 */
export function filterReviews(
  reviews: any[],
  filters: {
    query?: string;
    cuisine?: string;
    location?: string;
    price?: string;
  }
): any[] {
  let filtered = [...reviews];

  // Text search in title, cuisine, and location
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (review) =>
        review.title.toLowerCase().includes(query) ||
        review.cuisine.toLowerCase().includes(query) ||
        review.location.toLowerCase().includes(query)
    );
  }

  // Filter by cuisine
  if (filters.cuisine) {
    filtered = filtered.filter((review) =>
      review.cuisine.toLowerCase().includes(filters.cuisine!.toLowerCase())
    );
  }

  // Filter by location
  if (filters.location) {
    filtered = filtered.filter((review) =>
      review.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  // Filter by price
  if (filters.price) {
    filtered = filtered.filter((review) => review.price === filters.price);
  }

  // Sort by rating (highest first)
  return filtered.sort((a, b) => b.rating - a.rating);
}

/**
 * Helper function to group reviews by category
 */
export function groupReviewsByCategory(
  reviews: any[],
  categoryType: "cuisine" | "location"
): Record<string, any[]> {
  return reviews.reduce((acc, review) => {
    const category = review[categoryType];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(review);
    return acc;
  }, {} as Record<string, any[]>);
}
