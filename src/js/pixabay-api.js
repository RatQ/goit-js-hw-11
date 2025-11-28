import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "53387136-aec480b6b069bc63c101bbeda";
export const PER_PAGE = 40;

export async function fetchImages(query, page = 1, per_page = PER_PAGE) {
  const q = String(query || "").trim();
  if (!q) {
    throw new Error("Empty search query");
  }

  const params = {
    key: API_KEY,
    q,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; // повертаємо саме те, що прийшло з API
  } catch (err) {
    if (err.response) {
      throw new Error(`API error: ${err.response.status} ${err.response.statusText}`);
    } else if (err.request) {
      throw new Error("Network error: no response from server");
    } else {
        throw new Error(err.message);
    }
  }
}