import React, { useContext } from "react";
import "./Style/Form.css";
import { TaskContext } from "../../Pages/Task/Task";
import FormControl from "./FormControl";
import BusyInputs from "./BusyInputs";

const Form = () => {
    // useContext is used to handle props better. 
  const {
    submitHandler,
    totalHours,
    totalHoursHandler,
    sleepTime,
    sleepHoursHandler,
    deadline,
    deadlineHandler,
    radio,
    handleRadioChange,
    daysLeft,
    busyHours,
    formatDate,
    busyHoursHandler,
    resetHandler,
    errors,
    initialSubmitHandler,
    showBusyInputs,
    backButtonHandler,
  } = useContext(TaskContext);

  return (
    <form className="main-form">
      <div
        className={`initial-inputs ${
          showBusyInputs ? "busy-inputs-wrapper" : ""
        }`}
      >
        {!showBusyInputs && (
          <>
            <FormControl
              label="How many hours does it take to finish this task?"
              input={
                <input
                  className={errors.totalHours ? "required input" : "input"}
                  type="number"
                  id="total-hours"
                  onChange={totalHoursHandler}
                  value={totalHours}
                />
              }
              error={errors.totalHours && "Please enter valid number"}
              toolTip="tooltip"
            />

            <FormControl
              label="Your usual sleep time"
              input={
                <input
                  className={errors.sleepTime ? "required input" : "input"}
                  type="number"
                  id="sleep-hours"
                  onChange={sleepHoursHandler}
                  value={sleepTime}
                />
              }
              error={errors.sleepTime && "Please enter valid number"}
            />

            <FormControl
              label="When is the deadline?"
              input={
                <input
                  className={errors.daysLeft ? "required input" : "input"}
                  type="date"
                  id="deadline"
                  onChange={deadlineHandler}
                  value={deadline}
                />
              }
              error={errors.daysLeft && "Please enter valid date"}
            />

            <fieldset>
              <legend>
                Select the workload:
                <span className="tooltip"></span>
              </legend>
              <div className="form-control">
                <label htmlFor="asap">ASAP</label>
                <input
                  type="radio"
                  id="asap"
                  value="asap"
                  name="workload"
                  checked={radio === "asap"}
                  onChange={handleRadioChange}
                ></input>
              </div>
              <div className="form-control">
                <label htmlFor="equal">Equal</label>
                <input
                  type="radio"
                  id="equal"
                  value="equal"
                  name="workload"
                  checked={radio === "equal"}
                  onChange={handleRadioChange}
                ></input>
              </div>
            </fieldset>

            {errors.radio && (
              <span className={errors.radio ? "required" : ""}>
                This input is required
              </span>
            )}

            <div className="button-wrapper">
              <button onClick={initialSubmitHandler}>Confirm</button>
            </div>
          </>
        )}

        {/* generates busy hour inputs based on days remaining */}
        {!errors.daysLeft &&
          showBusyInputs &&
          daysLeft &&
          totalHours > 0 &&
          sleepTime > 0 &&
          sleepTime < 24 && (
            <BusyInputs
              backButtonHandler={backButtonHandler}
              daysLeft={daysLeft}
              busyHours={busyHours}
              formatDate={formatDate}
              errors={errors}
              busyHoursHandler={busyHoursHandler}
              submitHandler={submitHandler}
              resetHandler={resetHandler}
            />
          )}
      </div>
    </form>
  );
};

export default Form;
