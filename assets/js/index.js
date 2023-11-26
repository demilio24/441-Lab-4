let Clock = {
  init: function () {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let newDate = new Date();
    newDate.setDate(newDate.getDate());
    $("#Date").html(
      dayNames[newDate.getDay()] +
        " " +
        newDate.getDate() +
        " " +
        monthNames[newDate.getMonth()] +
        " " +
        newDate.getFullYear()
    );

    setInterval(function () {
      let seconds = new Date().getSeconds();
      $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    setInterval(function () {
      let minutes = new Date().getMinutes();
      $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {
      let hours = new Date().getHours();
      $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);
  },
};

let SunRise = {
  init: function () {
    SunRise.setup();
    SunRise.events();

    let geolocation = navigator.geolocation;

    geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        getTime("", lat, lng);
      },
      function (error) {
        console.log(error);
      }
    );
  },

  setup: function () {
    let html = "";

    for (let index = 0; index < locationData.length; index++) {
      const location = locationData[index];
      html +=
        (index ? " | " : "") +
        '<span class="cities" data-id="' +
        location._id +
        '" data-name="' +
        location.city_name +
        '" data-lat="' +
        location.lat +
        '"  data-lng="' +
        location.lng +
        '">' +
        location.city_name +
        "</span>";
    }
    $(".city-list").html(html);
  },

  events: function () {
    $(".cities").on("click", function () {
      let name = $(this).data("name");
      let lat = $(this).data("lat");
      let lng = $(this).data("lng");
      getTime(name, lat, lng);
    });
  },
};

$(document).ready(function () {
  Clock.init();
  SunRise.init();
});

function getTime(name, lat, lng) {
  let tomorrow = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  let tomorrowDate = formatTomorrowDate(tomorrow);

  jQuery.ajax({
    url: "https://api.sunrisesunset.io/json?lat=" + lat + "&lng=" + lng,
    method: "POST",
    dataType: "json",
    success: function (res) {
      if (res.status == "OK") {
        data = res.results;
        $(".selected_city").html(name);
        $("#today_sunrise").html(data.sunrise);
        $("#today_sunset").html(data.sunset);
        $("#today_dawn").html(data.dawn);
        $("#today_dusk").html(data.dusk);
        $("#today_day_length").html(data.day_length);
        $("#today_solar_noon").html(data.solar_noon);
        $("#today_timezone").html(data.timezone);
      } else {
        alert("Sorry, there was a network error.");
      }
    },
  });

  jQuery.ajax({
    url:
      "https://api.sunrisesunset.io/json?lat=" +
      lat +
      "&lng=" +
      lng +
      "&date=" +
      tomorrowDate,
    method: "POST",
    dataType: "json",
    success: function (res) {
      if (res.status == "OK") {
        data = res.results;
        $(".selected_city").html(name);
        $("#tomorrow_sunrise").html(data.sunrise);
        $("#tomorrow_sunset").html(data.sunset);
        $("#tomorrow_dawn").html(data.dawn);
        $("#tomorrow_dusk").html(data.dusk);
        $("#tomorrow_day_length").html(data.day_length);
        $("#tomorrow_solar_noon").html(data.solar_noon);
        $("#tomorrow_timezone").html(data.timezone);
      } else {
        alert("Sorry, there was a network error.");
      }
    },
  });
}

function formatTomorrowDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

let locationData = [
  {
    id: 1,
    city_name: "New York",
    lat: 40.712775,
    lng: -74.005973,
  },
  {
    id: 2,
    city_name: "Los Angeles",
    lat: 34.052235,
    lng: -118.243683,
  },
  {
    id: 3,
    city_name: "Chicago",
    lat: 41.881832,
    lng: -87.623177,
  },
  {
    id: 4,
    city_name: "Houston",
    lat: 29.760426,
    lng: -95.3698,
  },
  {
    id: 5,
    city_name: "Phoenix",
    lat: 33.448377,
    lng: -112.074039,
  },
];
