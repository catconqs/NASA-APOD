const transportButton = document.getElementById("transport-btn");
const datePicker = document.getElementById("astro-date");

//set max and min dates for date picker due to data availability
datePicker.setAttribute("min", "1995-06-16");
const currentDate = new Date().toISOString().slice(0, 10);
datePicker.setAttribute("max", currentDate);

//construct the API call
import { config } from "./config.js";
const NASAUrl = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = config.API_KEY;

const fetchAPODData = async (event) => {
  event.preventDefault();
  try {
    const dateSelected = document.getElementById("astro-date").value;
    const dateFormat = "&date=" + dateSelected + "&";
    const response = await fetch(`${NASAUrl}${api_key}${dateFormat}`);
    const data = await response.json();
    console.log("Data from NASA", data);
    updateDOM(data, dateSelected);
    console.log(dateSelected);
//error-handling
    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateDOM = (data, dateSelected) => {
  const dateString = dateSelected.toString();
  const year = dateString.substring(0, 4);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(8, 11);
  const formattedDate = day + "-" + month + "-" + year;
  console.log(formattedDate);
  document.getElementById("date-selected").textContent = formattedDate;
  document.getElementById("media-title").textContent =
    "✨ " + data.title + " ✨";
  document.getElementById("media").src = data.url;
  document.getElementById("accompanying-text").textContent = data.explanation;
  if (data.hasOwnProperty("copyright")) {
    document.getElementById("image-credit-copyright").textContent =
      "Image Credits and Copyright: " + data.copyright;
  } else {
    document.getElementById("image-credit-copyright").textContent = "";
  }
};

transportButton.addEventListener("click", fetchAPODData);
