import React, { useEffect, useState } from 'react'
import Container from '../Components/Container/Container'
import Form from '../Components/Form/Form'
import AsapResults from '../Components/ASAPResults/AsapResults'
import { formatDate } from '../Components/Function/FormatDate'

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
    const resetHandler = () => {
        setTotalHours('');
        setSleepTime(8);
        setDaysLeft('');
        setBusyHours([]);
        setFreeTime([]);
        setEnoughTime(null);
        setShowResults(false);
        setTaskSchedule([]);
    }
    // ideja padaryti viena button allocate time equally
    // o kita i want to finish task as fast as possible

    // this is where we calculate how many free time does user have
    useEffect(() => {
        let time = []
        busyHours.map(hours => {
            const fas = 24 - sleepTime - hours
            time.push(fas)
            return fas
        })
        setFreeTime(time)
    }, [busyHours, sleepTime])

    const submitHandler = (e) => {
        e.preventDefault()

        const totalFreeHours = freeTime.reduce((accumulator, currentValue) => accumulator + currentValue)

        // check if user has enough free time to finish task
        if (totalFreeHours >= totalHours) {
            setEnoughTime(true)
            setShowResults(true)

        } else {
            setEnoughTime(false)
            setShowResults(true)
        }
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
    }, [freeTime, totalHours, daysLeft])

    return (
        <Container>
            <Form
                onSubmit={submitHandler}
                totalHours={totalHours}
                totalOnChange={totalHoursHandler}
                sleepOnChange={sleepHoursHandler}
                sleepTime={sleepTime}
                deadlineOnChange={deadlineHandler}
                daysLeft={daysLeft}
                busyHours={busyHours}
                formatDate={formatDate}
                busyOnChange={busyHoursHandler}
                resetHandler={resetHandler}
            />

            {showResults &&
                <>
                    <AsapResults
                        enoughTime={enoughTime}
                        taskSchedule={taskSchedule}
                        formatDate={formatDate}
                    />
                </>
            }

        </Container>
    )
}
export default Task