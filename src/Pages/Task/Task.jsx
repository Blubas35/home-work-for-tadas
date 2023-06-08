import React, { useEffect, useState, createContext } from "react";
import Container from "../../Components/Container/Container";
import Form from "../../Components/Form/Form";
import AsapResults from "../../Components/ASAPResults/AsapResults";
import { formatDate } from "../../Components/Function/FormatDate";
import "./Style/Task.css";
import PageTitle from "../../Components/PageTitle/PageTitle";
import leftSide from "../../Assets/left-side.svg";

export const TaskContext = createContext();

const Task = () => {
  // const initialValues = { totalHours: '', sleepTime: 8,  }
  const [totalHours, setTotalHours] = useState("");
  const [deadline, setDeadline] = useState("");
  const [sleepTime, setSleepTime] = useState(8);
  const [daysLeft, setDaysLeft] = useState("");
  const [busyHours, setBusyHours] = useState([]);
  const [freeTime, setFreeTime] = useState(
    []
  ); /*how many hours on certain day are free to complete the task*/
  const [enoughTime, setEnoughTime] =
    useState(
      null
    ); /*This state is used to render answer if user can finish task in time*/
  const [showResults, setShowResults] =
    useState(
      false
    ); /*this state is used to render result wrapper with recommended hours*/
  const [showBusyInputs, setShowBusyInputs] = useState(false);
  const [taskSchedule, setTaskSchedule] = useState(
    []
  ); /*this state is used to create recommended schedule to complete task ASAP*/
  const [radio, setRadio] = useState("");
  const [errors, setErrors] = useState({
    totalHours: false,
    sleepTime: false,
    daysLeft: false,
    radio: false,
    busyHours: Array(busyHours.length).fill(false),
  });
  // reset states
  const resetHandler = () => {
    setTotalHours("");
    setDeadline("");
    setSleepTime(8);
    setDaysLeft("");
    setBusyHours([]);
    setFreeTime([]);
    setEnoughTime(null);
    setShowResults(false);
    setShowBusyInputs(false);
    setTaskSchedule([]);
    setRadio("");
  };

  const handleRadioChange = (e) => {
    setRadio(e.target.value);
    setErrors({ ...errors, radio: false });
  };

  const totalHoursHandler = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setTotalHours(value);
      setErrors({ ...errors, totalHours: false });
    }
    if (value <= 0 || value.length < 1) {
      setErrors({ ...errors, totalHours: true });
    }
  };

  const deadlineHandler = (e) => {
    setDeadline(e.target.value);
    const today = new Date();
    const deadlineDate = new Date(e.target.value);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysRemaining <= 0) {
      setErrors({ ...errors, daysLeft: true });
      return;
    } else {
      setDaysLeft(daysRemaining);
      setErrors({ ...errors, daysLeft: false });
    }

    setShowResults(false); /*reset result wrapper everytime deadline changes*/
    // Generate initial busy hours array with days remaining to render array of inputs
    const initialBusyHours = Array(daysRemaining).fill("");
    setBusyHours(initialBusyHours);
  };

  const sleepHoursHandler = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setSleepTime(value);
      setErrors({ ...errors, sleepTime: false });
    }
    if (value <= 0 || value > 24) {
      setErrors({ ...errors, sleepTime: true });
    }
  };

  const busyHoursHandler = (e, index) => {
    const value = [...busyHours];
    value[index] = e.target.value;

    const updatedErrors = [...errors.busyHours];
    updatedErrors[index] = false;

    if (
      value[index] < 0 ||
      value[index] > 24 - sleepTime ||
      value[index].length < 1
    ) {
      updatedErrors[index] = true; // Set the error for the current input
    }
    setBusyHours(value);
    setErrors({ ...errors, busyHours: updatedErrors });
    setShowResults(false);
  };
  const initialSubmitHandler = (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (totalHours.length === 0) {
      setErrors({ ...errors, totalHours: true });
      hasErrors = true;
    }

    if (deadline.length === 0) {
      setErrors({ ...errors, daysLeft: true });
      hasErrors = true;
    }

    if (!radio) {
      setErrors({ ...errors, radio: true });
      hasErrors = true;
    }

    if (hasErrors === true) {
      setShowBusyInputs(false);
      return;
    }
    setShowBusyInputs(true);
  };
  const backButtonHandler = () => {
    setShowBusyInputs(false);
    setShowResults(false);
  };

  // ideja padaryti viena button allocate time equally
  // o kita i want to finish task as fast as possible

  // this is where we calculate how many free time does user have
  useEffect(() => {
    let time = [];
    busyHours.map((hours) => {
      const fas = 24 - sleepTime - hours;
      time.push(fas);
      return fas;
    });
    setFreeTime(time);
  }, [busyHours, sleepTime]);

  const submitHandler = (e) => {
    e.preventDefault();

    // check for errors
    if (
      errors.totalHours ||
      errors.sleepTime ||
      errors.daysLeft ||
      errors.busyHours.includes(true)
    ) {
      return;
    }

    const totalFreeHours = freeTime.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    // check if user has enough free time to finish task
    if (totalFreeHours >= totalHours) {
      setEnoughTime(true);
      setShowResults(true);
    } else {
      setEnoughTime(false);
      setShowResults(true);
    }
  };

  // this is where we calculate the schedule for user to complete his task in time
  useEffect(() => {
    if (radio === "asap") {
      let remainingTime = totalHours;
      let schedule = [];

      for (let i = 0; i < daysLeft; i++) {
        if (remainingTime <= 0) {
          break;
        }
        const availableTime = Math.min(freeTime[i] || 0, remainingTime);
        schedule.push({
          day: i + 1,
          hours: availableTime,
        });

        remainingTime -= availableTime;
      }

      setTaskSchedule(schedule);
    }

    if (radio === "equal") {
      const hoursPerDay = Math.ceil(totalHours / daysLeft); // calculate the number of hours per day, rounded up to the nearest integer
      let remainingTime = totalHours;
      let schedule = [];

      for (let i = 0; i < daysLeft; i++) {
        if (remainingTime <= 0) {
          break;
        }
        const availableTime = Math.min(
          freeTime[i] || 0,
          remainingTime,
          hoursPerDay
        ); // limit the number of hours worked per day to the hoursPerDay calculated above
        schedule.push({
          day: i + 1,
          hours: availableTime,
        });

        remainingTime -= availableTime;
      }

      setTaskSchedule(schedule);
    }
  }, [radio, freeTime, totalHours, daysLeft]);

  // create a context object to pass it for the component
  const contextValues = {
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
  };

  return (
    <TaskContext.Provider value={contextValues}>
      <Container>
        <PageTitle
          title="Assignment due date calculator and planner!"
          subTitle="With the help of this tool never miss your assignments again!"
        />

        <div className="content-wrapper">
          <Form />

          <div className="left-side">
            <div className="image-wrapper">
              <img src={leftSide} alt="planner and clock"></img>
            </div>
            {showResults && (
              <AsapResults
                enoughTime={enoughTime}
                taskSchedule={taskSchedule}
                formatDate={formatDate}
              />
            )}
          </div>
        </div>
      </Container>
    </TaskContext.Provider>
  );
};
export default Task;
