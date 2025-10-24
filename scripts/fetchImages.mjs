// Get images from notion and store in public
import fs from "fs";

const API_BASE_URL = process.env.NETLIFY_API_BASE_URL;

async function getAllReviews() {
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

function toCamelCaseAndRemoveSpecialChars(str) {
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

const reviewDbRowToObject = (row) => {
  const properties = row.properties.reduce((acc, prop) => {
    acc[toCamelCaseAndRemoveSpecialChars(prop.name)] = prop.value;
    return acc;
  }, {});

  return {
    id: row.id,
    created_time: row.created_time,
    properties: properties,
  };
};

async function main() {
  try {
    const res = await getAllReviews();
    if (!res || !res.reviews) {
      console.error("No reviews found or invalid response structure.");
      return;
    }

    // Convert each review from the database row format to a more usable object

    const reviews = res.reviews.map(reviewDbRowToObject);

    // Fetch images for each review
    // Each review has a 'properties' object with a filesMedia array
    for (const review of reviews) {
      if (
        review.properties.filesMedia &&
        review.properties.filesMedia.length > 0
      ) {
        for (const [index, file] of review.properties.filesMedia.entries()) {
          const reviewName = review.properties.name
            ? toCamelCaseAndRemoveSpecialChars(review.properties.name)
            : "unknown-review";

          const imageUrl = file;
          const extension = imageUrl.split(".").pop().split("?")[0]; // Get the file extension, removing any query parameters
          const imageName = index ? `${reviewName}-${index + 1}` : reviewName; // Use the review name and append index if necessary

          // Fetch the image
          const imageResponse = await fetch(imageUrl);

          if (!imageResponse.ok) {
            console.error(
              `Failed to fetch image for review ID ${review.properties.name}: ${imageUrl}`
            );
            continue;
          }

          const imageBuffer = await imageResponse.arrayBuffer();

          // Save the file to the public directory
          const publicDir = "./public/images/reviews";
          const imageDir = `${publicDir}/${imageName}`;
          const filePath = `${imageDir}/${imageName}.${extension}`;

          // Ensure the directory exists
          await fs.promises.mkdir(imageDir, { recursive: true });

          // Write the file to disk
          await fs.promises.writeFile(filePath, Buffer.from(imageBuffer));
        }
      }
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
