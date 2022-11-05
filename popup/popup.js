const ONE_SECOND_IN_MILLISECOND = 1000;
let hour = 0;
let minute = 0;
let second = 0;
let timerStarted = false;
let intervalID;

//
// HTML elements
const hourSpan = document.querySelector(".hours");
const minuteSpan = document.querySelector(".minutes");
const secondSpan = document.querySelector(".seconds");
const startButton = document.querySelector(".start_button");
const stopButton = document.querySelector(".stop_button");

//
// Functions
const increment = () => {
  second++;

  if (second > 60) {
    second = 0;
    minute++;
  }
  if (minute > 60) {
    minute = 0;
    hour++;
  }
};

const display = () => {
  const timeFormat = (number) => (number < 10 ? `0${number}` : number);

  hourSpan.innerText = timeFormat(hour);
  minuteSpan.innerText = timeFormat(minute);
  secondSpan.innerText = timeFormat(second);
};

startButton.addEventListener("click", () => {
  intervalID = setInterval(() => {
    increment();
    display();
  }, ONE_SECOND_IN_MILLISECOND);

  if (!timerStarted) {
    chrome.runtime.sendMessage({
      cmd: "start-timer",
      time: { hour, minute, second },
    });
  }

  timerStarted = true;

  startButton.hidden = true;
  stopButton.hidden = false;
});

stopButton.addEventListener("click", () => {
  clearInterval(intervalID);
  intervalID = null;

  timerStarted = false;

  startButton.hidden = false;
  stopButton.hidden = true;

  // Reset time
  hour = 0;
  minute = 0;
  second = 0;
  startButton.innerText = "Restart Work Session";

  chrome.runtime.sendMessage({
    cmd: "stop-timer",
    time: { hour, minute, second },
  });
});

//
// Run when popup is shown
chrome.runtime.sendMessage({ cmd: "get-time" }, (response) => {
  const { time } = response;
  hour = time.hour;
  minute = time.minute;
  second = time.second;
  timerStarted = response.timerStarted;

  if (timerStarted) startButton.click();
  if (!timerStarted) {
    hourSpan.innerText = "00";
    minuteSpan.innerText = "00";
    secondSpan.innerText = "00";
  }
});
