export function toCamelCaseAndRemoveSpecialChars(str: string) {
  // 1. Remove non-alphanumeric characters (except spaces, which will be used for word splitting)
  // and convert to lowercase.
  let cleanedStr = str.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();

  // 2. Split the string into words based on spaces.
  let words = cleanedStr.split(" ");

  // 3. Capitalize the first letter of each word (except the first word) and join them.
  let camelCaseStr = words
    .map((word, index) => {
      if (index === 0) {
        return word; // First word remains lowercase
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");

  return camelCaseStr;
}

export function capitalize(str: string) {
  // Capitalize the first letter of the string and return it
  return str.charAt(0).toUpperCase() + str.slice(1);
}
