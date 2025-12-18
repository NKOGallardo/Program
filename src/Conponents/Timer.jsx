import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function Timer() {
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / duration;
  const offset = circumference - progress * circumference;

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const snapValue = (el, max) => {
    const value = Math.round(el.scrollTop / 40);
    el.scrollTop = value * 40;
    return Math.min(max, value);
  };

  const handleScroll = () => {
    const mins = snapValue(minutesRef.current, 59);
    const secs = snapValue(secondsRef.current, 59);
    const total = mins * 60 + secs || 1;

    setDuration(total);
    setTimeLeft(total);
  };

  const format = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60
    ).padStart(2, "0")}`;

  return (
    <div className="app">
      <div className="timer-circle">
        <svg width="220" height="220">
          <circle className="bg" r={radius} cx="110" cy="110" />
          <circle
            className="progress"
            r={radius}
            cx="110"
            cy="110"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <div className="time-text">{format(timeLeft)}</div>
      </div>

      {!running && (
        <div className="picker">
          <div className="column" ref={minutesRef} onScroll={handleScroll}>
            {[...Array(60)].map((_, i) => (
              <div key={i}>{String(i).padStart(2, "0")}</div>
            ))}
          </div>

          <span>:</span>

          <div className="column" ref={secondsRef} onScroll={handleScroll}>
            {[...Array(60)].map((_, i) => (
              <div key={i}>{String(i).padStart(2, "0")}</div>
            ))}
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={() => setRunning(true)}>Start</button>
        <button
          onClick={() => {
            setRunning(false);
            setTimeLeft(duration);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
