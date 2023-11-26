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
