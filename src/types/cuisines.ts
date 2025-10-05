export const CUISINES = [
  `afghan`,
  `bangladeshi`,
  `brunch`,
  `chinese`,
  `dessert`,
  `fishChips`,
  `greek`,
  `indian`,
  `italian`,
  `japanese`,
  `korean`,
  `malaysian`,
  `mexican`,
  `middleEastern`,
  `pastry`,
  `pub`,
  `thai`,
  `uyghur`,
  `vietnamese`,
  `western`,
] as const;

export type CuisineName = (typeof CUISINES)[number];

export interface CuisineObject {
  icon: string;
  url: string;
}
