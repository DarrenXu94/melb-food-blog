export interface Review {
  id: string;
  created_time: string;
  properties: ReviewProperties;
}

export interface ReviewProperties {
  name: string;
  rating: string;
  filesMedia: string[];
  cuisineType: string[];
  suburb: string;
  notes: string;
  priceRange: string;
  diningStyle: string;
}
