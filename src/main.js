import { fetchImages } from "./js/pixabay-api.js";
import { renderPhoto, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");

form.addEventListener("submit", onSearch);

async function onSearch(e) {
  e.preventDefault();

  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    // если есть showError, используй её; пока — alert
    alert("Please enter a search term");
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query);
    if (!data || !data.hits || data.hits.length === 0) {
      alert("No images found");
      return;
    }
    renderPhoto(data.hits);
  } catch (err) {
    alert("Error: " + (err.message || err));
  } finally {
    hideLoader();
  }
}