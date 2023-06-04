import React from "react";
import "./Style/AsapResults.css";

const AsapResults = ({ enoughTime, taskSchedule, formatDate }) => {
  return (
    <div className="result-wrapper">
      {enoughTime ? (
        <>
          <h2 className="title">
            <span className="first-word">Congratulations!</span>
            <span> You do have enough time to finish this task in time</span>
          </h2>
          <h3 className="sub-title">
            Recommended time to spend on each day to complete this task ASAP
          </h3>
          <ul>
            {taskSchedule.map((item) => {
              const index = item.day - 1;
              const formattedDate = formatDate(index);

              return (
                <li key={item.day}>
                  On day {formattedDate}: {item.hours} hours
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h2 className="title">
          Unfortunately based on these inputs you do not have enough time to
          finish this task
        </h2>
      )}
    </div>
  );
};

export default AsapResults;
