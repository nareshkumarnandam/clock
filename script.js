let clock = document.getElementById("clock");
let hours = document.getElementById("hours")
let minutes = document.getElementById("mins")
let seconds = document.getElementById("secs")
let ampm = document.getElementById("ampm");
let body = document.getElementById("body");
let box1 = document.getElementById("boxes1");
let box2 = document.getElementById("boxes2");
let box3 = document.getElementById("boxes3");
let box4 = document.getElementById("boxes4");
let heading = document.getElementById("heading");
let weather = document.getElementById("weather");

function updateTime(){
    let hrs = new Date().getHours();
    let mins = new Date().getMinutes();
    let secs = new Date().getSeconds();
    let updatedAmpm = "AM";
    if ( hrs >= 18){
        body.classList.add("bodyNight");
        box1.classList.add("boxes");
        box2.classList.add("boxes");
        box3.classList.add("boxes");
        box4.classList.add("boxes");
        heading.style.color = "#c2c2c2";
        heading.style.fontSize = "2.5rem";
        heading.style.letterSpacing = "2px";
        clock.style.boxShadow = "0 0 10px rgb(119, 119, 119)";
        weather.style.boxShadow = "0 0 10px rgb(119, 119, 119)";
    }
    if(hrs > 12){
        hrs = hrs - 12;
        updatedAmpm = "PM";
        // body.classList.add("bodyNight");
        // box1.classList.add("boxes");
        // box2.classList.add("boxes");
        // box3.classList.add("boxes");
        // box4.classList.add("boxes");
        // heading.style.color = "#c2c2c2";
        // heading.style.fontSize = "2.5rem";
        // heading.style.letterSpacing = "2px";
    }
    
    hrs = hrs > 9 ? hrs : "0" + hrs;
    mins = mins > 9 ? mins : "0" + mins;
    secs = secs > 9 ? secs : "0" + secs;


    hours.innerText = hrs;
    minutes.innerText = mins;
    seconds.innerText = secs;
    ampm.innerText = updatedAmpm;
    
    setTimeout(() => {
        updateTime();
      }, 1000);
      
}
// console.log(hours);
// console.log(seconds);
updateTime();


let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;
 
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
 
      // API ID
      const api = "6d055e39ee237af35ca066f35474e9df";
 
      // API URL
      const base =
`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
 
      // Calling the API
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          temperature.textContent = 
              Math.floor(data.main.temp - kelvin) + "°C";
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + "," + data.sys.country;
          let icon1 = data.weather[0].icon;
          icon.innerHTML = 
              `<img src="./weather.png" style= 'height:100%;'/>`;
        });
    });
  }
});