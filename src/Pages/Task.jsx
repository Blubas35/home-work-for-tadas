import React, { useState } from 'react'
import Container from '../Components/Container/Container'

const Task = () => {

    const [totalHours, setTotalHours] = useState('')
    const [deadline, setDeadline] = useState('')
    const [daysLeft, setDaysLeft] = useState('')
    const [busyHours, setBusyHours] = useState([]);
    const [enoughTime, setEnoughTime] = useState(null)
    const [showResults, setShowResults] = useState(false)

    const totalHoursHandler = (e) => setTotalHours(e.target.value)

    const deadlineHandler = (e) => {
        setDeadline(e.target.value)
        const today = new Date();
        const deadlineDate = new Date(e.target.value);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDaysLeft(daysRemaining);
        setShowResults(false)
        // Generate initial busy hours array with days remaining to render array of inputs
        const initialBusyHours = Array(daysRemaining).fill('');
        setBusyHours(initialBusyHours);
    }

    const busyHoursHandler = (e, index) => {
        const updatedBusyHours = [...busyHours];
        updatedBusyHours[index] = e.target.value;
        setShowResults(false)
        setBusyHours(updatedBusyHours);
    };

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
    }

    return (
        <Container>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='total-hours'>How many hours does it take to finish this task?</label>
                    <input type='number' id='total-hours' onChange={totalHoursHandler}></input>
                </div>
                <div>
                    <label htmlFor='deadline'>When is the deadline?</label>
                    <input type='date' id='deadline' onChange={deadlineHandler}></input>
                </div>
                {/* <div>
                    <label htmlFor='free-hours'>How many hours per day could you dedicate to this task? </label>
                    <input type='number' id='free-hours'></input>
                </div> */}
                {/* busy hours input based on days remaining */}
                {daysLeft && totalHours.length > 0 && (
                    <>
                        <div>{daysLeft ? `Days left until deadline: ${daysLeft}` : ''}</div>
                        <div className='busy-inputs'>
                            <h2 className='title'>How many busy hours on day:</h2>
                            {busyHours.map((hours, index) => {
                                const currentDate = new Date();
                                currentDate.setDate(currentDate.getDate() + index); // Added index to current date to get the date fpr each day
                                const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
                                return (
                                    <div key={index}>
                                        <label htmlFor={`busy-hours-${index}`}>How many busy hours on {formattedDate} ?</label>
                                        <input type='number' id={`busy-hours-${index}`} value={hours} onChange={(e) => busyHoursHandler(e, index)}></input>
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
                            {busyHours.map((hours, index) => {
                                const currentDate = new Date();
                                currentDate.setDate(currentDate.getDate() + index); // Added index to current date to get the date fpr each day
                                const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
                                return (
                                    <ul key={index}>
                                        <li>Recommended hours to spend on {formattedDate} = {hours} </li>
                                    </ul>
                                );
                            })}
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