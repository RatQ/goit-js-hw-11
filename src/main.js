import { fetchImages, galleryCreate, errorAlert } from "./js/pixabay-api";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

form.addEventListener("submit", onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    errorAlert("Please enter a search term");
    return;
  }

  gallery.innerHTML = "";

  showLoader();

  try {
    const data = await fetchImages(query);
    galleryCreate(data);
  } catch (error) {
    errorAlert(error.message);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}
