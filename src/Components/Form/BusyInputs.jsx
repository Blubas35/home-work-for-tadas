import React from "react";
import './Style/BusyInputs/BusyInputs.scss'

const BusyInputs = ({
  backButtonHandler,
  daysLeft,
  busyHours,
  formatDate,
  errors,
  busyHoursHandler,
  submitHandler,
  resetHandler,
}) => {
  return (
    <>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={backButtonHandler}>
          <span></span>
        </button>
      </div>

      <div className="days-left-wrapper">
        <h3>Days left until deadline: </h3>
        <span>{daysLeft}</span>
      </div>

      <h2 className="title">
        State your busy hours on day:
        <span className="tooltip"></span>
      </h2>
      <div className="busy-inputs">
        {busyHours.map((hours, index) => {
          if (hours === "") {
            hours = "0";
          }
          const formattedDate = formatDate(index);

          return (
            <div className="form-control" key={index}>
              <h3 className="date">{formattedDate}</h3>
              <label
                className={errors.busyHours[index] ? "required" : ""}
                htmlFor={`busy-hours-${index}`}
              >
                Busy hours
              </label>
              <input
                className={errors.busyHours[index] ? "required input" : "input"}
                type="number"
                value={hours}
                onChange={(e) => busyHoursHandler(e, index)}
              ></input>
              {errors.busyHours[index] && (
                <span className="required">Please enter valid number</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="button-wrapper">
        <button className="submit-button" type="submit" onClick={submitHandler}>
          Submit
        </button>
        <button className="reset-button" type="reset" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </>
  );
};

export default BusyInputs;
