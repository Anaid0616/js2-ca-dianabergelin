/**
 * Logs the user out by removing authentication-related data from localStorage
 * and redirecting to the login page.
 *
 * - Removes the `token` and `user` data from `localStorage`.
 * - Alerts the user that they have been logged out.
 * - Redirects the browser to the `/auth/login/` page.
 *
 * @function logout
 * @returns {void}
 */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  alert("You have been logged out");
  window.location.href = "/auth/login/";
}
