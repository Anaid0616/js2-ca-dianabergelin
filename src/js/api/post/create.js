import { API_SOCIAL_POSTS } from "../constants.js";
import { API_KEY } from "../../api/constants";

/**
 * Creates a new post by sending the data to the API.
 *
 * @param {Object} data - The post parameters.
 * @param {string} data.title - The title of the post (required).
 * @param {string} [data.body] - The body of the post (optional).
 * @param {string[]} [data.tags] - Array of tags associated with the post (optional).
 * @param {Object} [data.media] - Media object containing URL and alt text (optional).
 * @param {string} [data.media.url] - The URL of the media (optional).
 * @param {string} [data.media.alt] - Alt text for the media (optional).
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails.
 */
export async function createPost({ title, body = "", tags = [], media = {} }) {
  const token = localStorage.getItem("token"); // Retrieve the token for authentication
  console.log("Token used for Authorization:", token);
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token for authorization
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({ title, body, tags, media }), // Pass the post data
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    // Parse the response JSON
    const jsonResponse = await response.json();
    console.log("API Response from createPost:", jsonResponse);

    // Return the JSON response if all checks pass
    return jsonResponse;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error; // Re-throw error for further handling
  }
}
