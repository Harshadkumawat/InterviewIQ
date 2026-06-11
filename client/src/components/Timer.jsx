import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100;

  const pathColor =
    percentage > 50 ? "#6366f1" : percentage > 25 ? "#f59e0b" : "#ef4444";

  const textColor =
    percentage > 50 ? "#6366f1" : percentage > 25 ? "#f59e0b" : "#ef4444";

  return (
    <div className="w-20 h-20">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "26px",
          pathColor,
          textColor,
          trailColor: "#e4e4e7",
          pathTransitionDuration: 0.8,
        })}
      />
    </div>
  );
}

export default Timer;
