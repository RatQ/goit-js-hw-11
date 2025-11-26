import axios from "axios";
import { renderPhoto } from "./render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "../error.svg";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "53387136-aec480b6b069bc63c101bbeda";

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function galleryCreate(data) {
  if (!data.hits || data.hits.length === 0) {
    iziToast.error({
      title: "Error",
      message: "No images found",
      iconUrl: errorIcon,
      position: "topCenter",
    });
    return;
  }

  renderPhoto(data.hits);
}

export function errorAlert(error) {
  iziToast.error({
    title: "Error",
    message: error,
    iconUrl: errorIcon,
    position: "topCenter",
  });
}
