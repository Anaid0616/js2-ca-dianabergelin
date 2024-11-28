import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";

// Ensure the user is authenticated
authGuard();

// Get the post ID from the URL
const postId = new URLSearchParams(window.location.search).get("id");
if (!postId) {
  alert("No post ID found. Redirecting to home page.");
  window.location.href = "/";
}

// Get form elements
const form = document.getElementById("edit-post-form");
const titleInput = document.getElementById("edit-title");
const bodyInput = document.getElementById("edit-body");
const tagsInput = document.getElementById("edit-tags");
const mediaUrlInput = document.getElementById("edit-media-url");
const mediaAltInput = document.getElementById("edit-media-alt");

// Load the post data into the form
async function loadPostData() {
  try {
    const response = await readPost(postId);

    // Check if data exists
    if (!response || !response.data) {
      throw new Error("Post data not found.");
    }

    console.log("Post data fetched successfully:", response); // Debugging

    const { data: post } = response;

    // Populate the form fields with fetched post data
    titleInput.value = post.title || "";
    bodyInput.value = post.body || "";
    tagsInput.value = post.tags?.join(", ") || ""; // Join array of tags into a comma-separated string
    mediaUrlInput.value = post.media?.url || "";
    mediaAltInput.value = post.media?.alt || "";

    console.log("Form populated with post data"); // Debugging
  } catch (error) {
    console.error("Error loading post data:", error);
    alert("Failed to load post data. Redirecting to home page.");
    window.location.href = "/";
  }
}

// Save the updated post data
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedPost = {
    title: titleInput.value,
    body: bodyInput.value,
    tags: tagsInput.value.split(",").map((tag) => tag.trim()), // Convert string back to array
    media: {
      url: mediaUrlInput.value,
      alt: mediaAltInput.value,
    },
  };

  try {
    const updated = await updatePost(postId, updatedPost);
    console.log("Post updated successfully:", updated);
    alert("Post updated successfully!");
    window.location.href = `/post/?id=${postId}`;
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Failed to update post. Please try again.");
  }
});

// Call loadPostData when the page loads
loadPostData();
