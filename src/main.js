import { fetchImages } from "./js/pixabay-api.js";
import { renderPhoto, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");

form.addEventListener("submit", onSearch);

function showError(message) {
  iziToast.error({
    title: "Помилка",
    message: message,
    position: "topRight",
    timeout: 4000,
  });
}

async function onSearch(e) {
  e.preventDefault();

  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    showError("Будь ласка, введіть пошуковий запит");
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query);
    if (!data || !data.hits || data.hits.length === 0) {
      showError("Sorry, there are no images matching your search query. Please try again!");
      return;
    }
    renderPhoto(data.hits);
  } catch (err) {
    showError("Помилка: " + (err.message || err));
  } finally {
    hideLoader();
  }
}