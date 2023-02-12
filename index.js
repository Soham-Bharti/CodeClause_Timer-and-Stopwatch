$(".stopwatch-btn").click(function () {
  // hiding clock wrappper
  $(".clock").slideUp();
  // showing stopwatch wrapper
  $(".stopwatch").slideDown();
  // updating type text
  $(".type").html("Stopwatch");
});

$(".back-btn").click(function () {
  // hiding all other wrappers
  $(".stopwatch").slideUp();
  $(".timer").slideUp();
  // showing clock wrapper
  $(".clock").slideDown();
  // updating type text
  $(".type").html("Clock");
});

$(".timer-btn").click(function () {
  // hiding clock
  $(".clock").slideUp();
  // showing timer wrapper
  $(".timer").slideDown();
  // updating type text
  $(".type").html("Timer");
});

const addTrailingZeros = (num) => {
  return num < 10 ? "0" + num : num;
};

const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = addTrailingZeros(hours);
  minutes = addTrailingZeros(minutes);
  seconds = addTrailingZeros(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
};
updateTime();

//calling updateTime fun every second
setInterval(updateTime, 1000);

// ****************************     Stopwatch       ********************
let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMilliseconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

const stopwatch = () => {
  stopwatchMilliseconds++;

  if (stopwatchMilliseconds === 100) {
    stopwatchSeconds++;
    stopwatchMilliseconds = 0;
  }
  if (stopwatchSeconds === 60) {
    stopwatchMinutes++;
    stopwatchSeconds = 0;
  }
  if (stopwatchMinutes === 60) {
    stopwatchHours++;
    stopwatchMinutes = 0;
  }

  $("#stopwatch-hour").html(addTrailingZeros(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZeros(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZeros(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZeros(stopwatchMilliseconds));
};
const startStopwatch = () => {
  if (!stopwatchRunning) {
    // if stopwatch is already not running
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
};

// fun to stop stopwatch
const stopStopwatch = () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
};

// reset stopwatch fun
const resetStopwatch = () => {
  // clear interval and setting all values to default
  clearInterval(stopwatchInterval);
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMilliseconds = 0;
  stopwatchRunning = false;
  laps = 0;

  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
  $(".laps").html("");
};

// start stopwatch on start button
$(".start-stopwatch").click(function () {
  startStopwatch();
  // hiding the start button and showing lap button
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function () {
  resetStopwatch();
  // showing the start button and hiding lap button
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
  laps++;
  // removing active class
  $(".lap").removeClass("active");
  $(".laps").prepend(
    `<div class="lap active">
      <p>lap ${laps}</p>
      <p>
        ${addTrailingZeros(stopwatchHours)} : ${addTrailingZeros(
      stopwatchMinutes
    )}: 
        ${addTrailingZeros(stopwatchSeconds)} : ${addTrailingZeros(
      stopwatchMilliseconds
    )}
      </p>
    </div>`
  );
});

// ********************************     Timer   ******************
let time = 0,
  timerHours = 0,
  timerSeconds = 0,
  timerMinutes = 0,
  timerMiliseconds = 0,
  timerInterval;
  timerRunning = false;

const getTime = () => {
  // time = prompt('Enter time in minutes');
  if (document.getElementById("timer-input").value != "" && document.getElementById("timer-input").value > 0) {
    time = document.getElementById("timer-input").value;
    $(".timer-input-container").hide();
    // convert time to seconds
    time = time * 60;
    // update timer defaults
    setTime();
  } else {
    alert("Please enter a valid time");
    document.getElementById("timer-input").value = "";
  }
};

const setTime = () => {
  timerHours = Math.floor(time / 3600);
  timerMinutes = Math.floor((time % 3600) / 60);
  timerSeconds = Math.floor(time % 60);
  timerMiliseconds = Math.floor(time / 60000);

  // show user entered time on doc
  $("#timer-hour").html(addTrailingZeros(timerHours));
  $("#timer-min").html(addTrailingZeros(timerMinutes));
  $("#timer-sec").html(addTrailingZeros(timerSeconds));
  $("#timer-ms").html(addTrailingZeros(timerMiliseconds));
};

const timer = () => {
  timerMiliseconds--;
  if (timerMiliseconds === -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds === -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes === -1) {
    timerMinutes = 59;
    timerHours--;
  }

  // update time
  $("#timer-hour").html(addTrailingZeros(timerHours));
  $("#timer-min").html(addTrailingZeros(timerMinutes));
  $("#timer-sec").html(addTrailingZeros(timerSeconds));
  $("#timer-ms").html(addTrailingZeros(timerMiliseconds));

  // checking time up on each interval
  timeUp();
};

const startTimer = () => {
  // checking if entered time is valid
  if (
    timerHours === 0 &&
    timerMinutes === 0 &&
    timerSeconds === 0 &&
    timerMiliseconds === 0 &&
    !timerRunning
  ) {
    // if all values are 0, getting time
    getTime();
  } else {
    // starting timer
    timerRunning = true;
    timerInterval = setInterval(timer, 10);
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
};

const stopTimer = () => {
  timerRunning = false;
  clearInterval(timerInterval);
  $(".start-timer").show();
  $(".stop-timer").hide();
};

const resetTimer = () => {
  stopTimer();
  document.getElementById("timer-input").value = "";
  $(".timer-input-container").show();
  timerRunning = false;
  time = 0;
  setTime();
};

// checking if time remaining is 0
const timeUp = () => {
  if (
    timerHours === 0 &&
    timerMinutes === 0 &&
    timerSeconds === 0 &&
    timerMiliseconds === 0
  ) {
    stopTimer();
    alert("Time's up");
  }
};

$(".start-timer").click(function () {
  startTimer();
});
$(".stop-timer").click(function () {
  stopTimer();
});
$(".reset-timer").click(function () {
  resetTimer();
});
