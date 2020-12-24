import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

import "./timer.styles.css";
import restartImg from "../../../images/restart.png";
import AudioPlayer from "../../../audio/AudioPlayer.js";
import { setOnLoadPosition } from "../position-handler";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    /*Function that is called every second*/
    const interval = setInterval(() => {
      if (play) setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  function restartStopwatch() {
    setSeconds(0);
  }

  function convertSeconds(seconds) {
    /*Hours,minutes and seconds calculated from seconds and then formated*/
    let hours = parseInt(seconds / 3600);
    seconds = seconds - hours * 3600;
    let minutes = parseInt(seconds / 60);
    seconds = seconds - minutes * 60;

    seconds = ("00" + seconds.toString()).slice(-2);
    minutes = ("00" + minutes.toString()).slice(-2);
    hours = ("00" + hours.toString()).slice(-2);

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div id="stopwatch">
      <p>{convertSeconds(seconds)}</p>

      <div
        className={play ? "playButton pause" : "playButton"}
        onClick={() => setPlay((p) => !p)}
      ></div>

      <img src={restartImg} alt="" onClick={restartStopwatch} />
    </div>
  );
};

const Countdown = () => {
  const [play, setPlay] = useState(false);
  const [cdtime, setCdtime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const alarm = new AudioPlayer();

  function countdownFunc() {
    setCdtime((prev) => {
      if (prev.seconds <= 0) {
        if (prev.minutes <= 0) {
          if (prev.hours <= 0) {
            alarm.play();
            setPlay(false);
            return {
              hours: 0,
              minutes: 0,
              seconds: 0,
            };
          } else
            return {
              hours: prev.hours - 1,
              minutes: 59,
              seconds: 59,
            };
        } else
          return {
            hours: prev.hours,
            minutes: prev.minutes - 1,
            seconds: 59,
          };
      } else
        return {
          hours: prev.hours,
          minutes: prev.minutes,
          seconds: prev.seconds - 1,
        };
    });
  }

  useEffect(() => {
    /*Function that is called every second*/
    const interval = setInterval(() => {
      if (play) countdownFunc();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div id="countdown">
      <div id="timeset">
        <input
          type="number"
          onChange={(e) =>
            setCdtime((prev) => {
              return {
                hours: parseInt(e.target.value),
                minutes: prev.minutes,
                seconds: prev.seconds,
              };
            })
          }
          value={cdtime.hours}
        ></input>

        <h1>:</h1>

        <input
          type="number"
          max="60"
          onChange={(e) =>
            setCdtime((prev) => {
              return {
                hours: prev.hours,
                minutes: parseInt(e.target.value),
                seconds: prev.seconds,
              };
            })
          }
          value={cdtime.minutes}
        ></input>

        <h1>:</h1>

        <input
          type="number"
          max="60"
          onChange={(e) =>
            setCdtime((prev) => {
              return {
                hours: prev.hours,
                minutes: prev.minutes,
                seconds: parseInt(e.target.value),
              };
            })
          }
          value={cdtime.seconds}
        ></input>
      </div>

      <div
        className={play ? "playButton pause" : "playButton"}
        onClick={() => setPlay((p) => !p)}
      ></div>

      <img
        src={restartImg}
        alt=""
        onClick={() => setCdtime({ hours: 0, minutes: 0, seconds: 0 })}
      />
    </div>
  );
};

const Pomodoro = () => {
  const [countdownTimer, setCountdownTimer] = useState({
    work: { minutes: 25, seconds: 0 },
    rest: { minutes: 5, seconds: 0 },
  });
  const [pomodoroState, setPomodoroState] = useState("work");
  const [play, setPlay] = useState(false);

  const sound = new AudioPlayer();

  function printTimer() {
    let min, sec;
    if (pomodoroState === "work") {
      min = ("00" + countdownTimer.work.minutes.toString()).slice(-2);
      sec = ("00" + countdownTimer.work.seconds.toString()).slice(-2);
    } else {
      min = ("00" + countdownTimer.rest.minutes.toString()).slice(-2);
      sec = ("00" + countdownTimer.rest.seconds.toString()).slice(-2);
    }
    return `${min}:${sec}`;
  }

  function countdownFunc() {
    if (pomodoroState === "work") {
      /*WORK*/
      setCountdownTimer((prevCDT) => {
        if (prevCDT.work.minutes <= 0 && prevCDT.work.seconds <= 0) {
          sound.play();
          setPomodoroState("rest");
          return {
            work: { minutes: 25, seconds: 0 },
            rest: { minutes: 5, seconds: 0 },
          };
        } else {
          if (prevCDT.work.seconds <= 0) {
            return {
              work: { minutes: prevCDT.work.minutes - 1, seconds: 59 },
              rest: prevCDT.rest,
            };
          } else
            return {
              work: {
                minutes: prevCDT.work.minutes,
                seconds: prevCDT.work.seconds - 1,
              },
              rest: prevCDT.rest,
            };
        }
      });
    } else {
      /*REST*/
      setCountdownTimer((prevCDT) => {
        if (prevCDT.rest.minutes <= 0 && prevCDT.rest.seconds <= 0) {
          sound.play();
          setPomodoroState("work");
          return {
            work: { minutes: 25, seconds: 0 },
            rest: { minutes: 5, seconds: 0 },
          };
        } else {
          if (prevCDT.rest.seconds <= 0) {
            return {
              work: prevCDT.work,
              rest: { minutes: prevCDT.rest.minutes - 1, seconds: 59 },
            };
          } else
            return {
              work: prevCDT.work,
              rest: {
                minutes: prevCDT.rest.minutes,
                seconds: prevCDT.rest.seconds - 1,
              },
            };
        }
      });
    }
  }

  function resetPomodoroTimer() {
    setCountdownTimer({
      work: { minutes: 25, seconds: 0 },
      rest: { minutes: 5, seconds: 0 },
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (play) countdownFunc();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div id="pomodoro">
      <h1>{pomodoroState === "work" ? "Work" : "Rest"}</h1>
      <h1>{printTimer()}</h1>
      <div
        className={play ? "playButton pause" : "playButton"}
        onClick={() => setPlay((p) => !p)}
      ></div>
      <img src={restartImg} alt="" onClick={resetPomodoroTimer} />
    </div>
  );
};

const Timer = ({ setDraggedItem, id, setComponents, defaultPosition }) => {
  const [type, setType] = useState("Stopwatch");

  function renderSwitch(t) {
    switch (t) {
      case "Stopwatch":
        return <Stopwatch />;
        break;
      case "Countdown":
        return <Countdown />;
      case "Pomodoro":
        return <Pomodoro />;
      default:
        return <h1>Error</h1>;
    }
  }

  return (
    <Draggable
      onStart={() => setDraggedItem(id)}
      onStop={(e) => {
        setOnLoadPosition(e, setComponents, id);
        setDraggedItem(null);
      }}
      defaultPosition={defaultPosition}
    >
      <div id="timer">
        <div id="timerNavbar">
          <p
            className={type === "Stopwatch" ? "active" : null}
            onClick={() => setType("Stopwatch")}
          >
            Stopwatch
          </p>
          <p
            className={type === "Countdown" ? "active" : null}
            onClick={() => setType("Countdown")}
          >
            Countdown
          </p>
          <p
            className={type === "Pomodoro" ? "active" : null}
            onClick={() => setType("Pomodoro")}
          >
            Pomodoro
          </p>
        </div>
        {renderSwitch(type)}
      </div>
    </Draggable>
  );
};

export default Timer;
