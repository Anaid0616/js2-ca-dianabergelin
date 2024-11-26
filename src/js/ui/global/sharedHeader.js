import { logout } from "../auth/logout";

export async function loadHTMLHeader() {
  const headerElement = document.querySelector("header");
  try {
    // Update the path to fetch header/index.html
    const response = await fetch("/header/index.html");
    if (!response.ok) {
      throw new Error("Failed to load header");
    }
    const headerHTML = await response.text();
    headerElement.innerHTML = headerHTML;

    // Manage link visibility
    const token = localStorage.getItem("token");
    const loginLink = document.querySelector("a[href='./auth/login/']");
    const registerLink = document.querySelector("a[href='./auth/register/']");
    const logoutButton = document.querySelector("#logout-button");

    if (token) {
      if (loginLink) loginLink.style.display = "none";
      if (registerLink) registerLink.style.display = "none";
      if (logoutButton) {
        logoutButton.style.display = "block";
        logoutButton.addEventListener("click", logout);
      }
    } else {
      if (loginLink) loginLink.style.display = "block";
      if (registerLink) registerLink.style.display = "block";
      if (logoutButton) logoutButton.style.display = "none";
    }
  } catch (error) {
    console.error("Error loading header:", error);
  }
}
