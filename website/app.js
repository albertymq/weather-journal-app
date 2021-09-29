/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
//urlsample: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const apiKey = "&units=metric&appid=8e19cafcdc7f498294d254336d7d5aa1";

/* API website */
//https://openweathermap.org/current

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);
//call the reterive function and post to Server and updateUI
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getCityWeather(baseURL, zipCode, apiKey).then(function (data) {
    console.log("data Get");
    postData("/addlog", {
      temp: data.main.temp,
      date: newDate,
      content: feelings,
    }).then(updateUI());
  });
}

//postData function
const postData = async (url = "", data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log("Data posted", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//fetch data from openweather
const getCityWeather = async (baseURL, cityCode, Key) => {
  const res = await fetch(baseURL + cityCode + Key);
  //chain routes post data to Server
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//updateUI function
const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    console.log(allData);
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};
