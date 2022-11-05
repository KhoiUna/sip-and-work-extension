const ONE_SECOND_IN_MILLISECOND = 1000;
let hour = 0;
let minute = 0;
let second = 0;
let timerStarted = false;
let intervalID;

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

const notify = () => {
  const options = {
    type: "basic",
    title: "Drink Water!",
    message: "Time to take a sip",
    iconUrl: "./images/icon-128.png",
  };

  chrome.notifications.create(options);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { cmd } = request;

  if (cmd === "get-time") {
    sendResponse({
      timerStarted,
      time: { hour, minute, second },
    });
  }

  if (cmd === "start-timer") {
    const { time } = request;

    hour = time.hour;
    minute = time.minute;
    second = time.second;
    timerStarted = true;

    intervalID = setInterval(() => {
      increment();

      // Notify user every 15 min
      if (minute >= 15 && minute % 15 === 0) notify();
    }, ONE_SECOND_IN_MILLISECOND);
  }

  if (cmd === "stop-timer") {
    const { time } = request;

    hour = time.hour;
    minute = time.minute;
    second = time.second;
    timerStarted = false;

    clearInterval(intervalID);
    intervalID = null;
  }
});
