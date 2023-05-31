import React, { useEffect, useState } from 'react'
import Container from '../Components/Container/Container'

const Task = () => {

    const [totalHours, setTotalHours] = useState('')
    const [sleepTime, setSleepTime] = useState(8)
    const [daysLeft, setDaysLeft] = useState('')
    const [busyHours, setBusyHours] = useState([]);
    const [freeTime, setFreeTime] = useState([]) /*how many hours on certain day are free to complete the task*/
    const [enoughTime, setEnoughTime] = useState(null) /*This state is used to render answer if user can finish task in time*/
    const [showResults, setShowResults] = useState(false) /*this state is used to render result wrapper with recommended hours*/
    const [taskSchedule, setTaskSchedule] = useState([]); /*this state is used to create recommended schedule to complete task ASAP*/

    const totalHoursHandler = (e) => {
        setTotalHours(e.target.value)
    }

    const deadlineHandler = (e) => {
        const today = new Date();
        const deadlineDate = new Date(e.target.value);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDaysLeft(daysRemaining);
        setShowResults(false) /*reset result wrapper everytime deadline changes*/
        // Generate initial busy hours array with days remaining to render array of inputs
        const initialBusyHours = Array(daysRemaining).fill('');
        setBusyHours(initialBusyHours);
    }

    const sleepHoursHandler = (e) => setSleepTime(e.target.value)

    const busyHoursHandler = (e, index) => {
        const updatedBusyHours = [...busyHours];
        updatedBusyHours[index] = e.target.value;
        setShowResults(false)
        setBusyHours(updatedBusyHours);
    };
    // ideja padaryti viena button allocate time equally
    // o kita i want to finish task as fast as possible
    const submitHandler = (e) => {
        e.preventDefault()
        const stringToNumbers = busyHours.map(str => Number(str))
        const totalBusyHours = stringToNumbers.reduce((accumulator, currentValue) => accumulator + currentValue)

        if (totalBusyHours >= totalHours) {
            setEnoughTime(true)
            setShowResults(true)

        } else {
            setEnoughTime(false)
            setShowResults(true)
        }

        // this is where we calculate how many free time does user have
        let time = []

        busyHours.map(hours => {
            console.log(hours)
            const fas = 24 - sleepTime - hours
            time.push(fas)
        })
        setFreeTime(time)
    }

    // this is where we calculate the schedule for user to complete his task in time
    useEffect(() => {
        let remainingTime = totalHours;
        let schedule = [];

        for (let i = 0; i < daysLeft; i++) {
            if (remainingTime <= 0) {
                break;
            }
            const availableTime = Math.min(freeTime[i] || 0, remainingTime);
            schedule.push({
                day: i + 1,
                hours: availableTime
            });

            remainingTime -= availableTime;
        }

        setTaskSchedule(schedule);
    }, [freeTime])

    // this function formats day
    function formatDate(index) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + index);
        // Added index to current date to get the date for each day
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        return formattedDate
    }

    return (
        <Container>
            <form onSubmit={submitHandler}>
                <div>
                    <label className={totalHours ? '' : 'required'} htmlFor='total-hours'>How many hours does it take to finish this task?</label>
                    <input type='number' id='total-hours' onChange={totalHoursHandler}></input>
                </div>
                <div>
                    <label htmlFor='sleep-hours'>Your usual sleep time</label>
                    <input type='number' id='sleep-hours' onChange={sleepHoursHandler} value={sleepTime}></input>
                </div>
                <div>
                    <label htmlFor='deadline'>When is the deadline?</label>
                    <input type='date' id='deadline' onChange={deadlineHandler}></input>
                </div>
                {/* <div>
                    <label htmlFor='free-hours'>How many hours per day could you dedicate to this task? </label>
                    <input type='number' id='free-hours'></input>
                </div> */}
                {/* generates busy hour inputs based on days remaining */}
                {daysLeft && totalHours.length > 0 && (
                    <>
                        <div>{daysLeft ? `Days left until deadline: ${daysLeft}` : ''}</div>
                        <div className='busy-inputs'>
                            <h2 className='title'>How many busy hours on day:</h2>

                            {busyHours.map((hours, index) => {
                                const formattedDate = formatDate(index)

                                return (
                                    <div key={index}>
                                        <h3>{formattedDate}</h3>
                                        <label htmlFor={`busy-hours-${index}`}>Busy hours that day?</label>
                                        <input type='number' value={hours} onChange={(e) => busyHoursHandler(e, index)} ></input>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                <button type='submit'>Submit</button>
                {/* <button type='reset'>Reset</button> */}
            </form>
            {showResults &&
                <div className='result-wrapper'>
                    {enoughTime ? (
                        <>
                            <h2 className='title'>Congratulations! You do have enough time to finish this task in time</h2>
                            <h3 className='sub-title'>Recommended time to spend on each day to complete this task ASAP</h3>
                            <ul>
                                {taskSchedule.map((item) => {
                                    const index = item.day - 1
                                    const formattedDate = formatDate(index)

                                    return (
                                        <>
                                            <li key={item.day}>On day {formattedDate}: {item.hours} hours</li>
                                        </>
                                    )
                                })}
                            </ul>
                        </>
                    ) : (
                        <h2 className='title'>Unfortunately based on these inputs you do not have enough time to finish this task</h2>
                    )}
                </div>
            }

        </Container>
    )
}
export default Task