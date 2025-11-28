import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;

export function renderPhoto(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
  </a>
  <div class="info">
    <p class="info-item">Likes: <span class="info-span">${likes}</span></p>
    <p class="info-item">Views: <span class="info-span">${views}</span></p>
    <p class="info-item">Comments: <span class="info-span">${comments}</span></p>
    <p class="info-item">Downloads: <span class="info-span">${downloads}</span></p>
  </div>
</li>`
    )
    .join("");

  const gallery = document.querySelector(".gallery");
  gallery.insertAdjacentHTML("beforeend", markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
      captionPosition: "bottom",
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.querySelector(".gallery").innerHTML = "";
}

export function showLoader() {
  document.querySelector(".loader").classList.remove("hidden");
}

export function hideLoader() {
  document.querySelector(".loader").classList.add("hidden");
}