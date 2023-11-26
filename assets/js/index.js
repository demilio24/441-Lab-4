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
