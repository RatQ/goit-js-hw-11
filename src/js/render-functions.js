import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderPhoto(arr) {
  const list = document.querySelector(".gallery");

  list.innerHTML = arr
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
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p><b>Likes:</b> ${likes}</p>
    <p><b>Views:</b> ${views}</p>
    <p><b>Comments:</b> ${comments}</p>
    <p><b>Downloads:</b> ${downloads}</p>
  </div>
</li>`
    )
    .join("");

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });

  lightbox.refresh();
}