import axios from "axios";
import { renderPhoto } from "./render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "../error.svg";

export function galleryCreate(data) {
  if (!data.hits || data.hits.length === 0) {
    iziToast.error({
      title: "Error",
      message: "No images found",
      iconUrl: errorIcon,
      position: "topCenter",
    });
    return "";
  }

  return renderPhoto(data.hits);
}

export function errorAlert(error) {
  iziToast.error({
    title: "Error",
    message: error,
    iconUrl: errorIcon,
    position: "topCenter",
  });
}