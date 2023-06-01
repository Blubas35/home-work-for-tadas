import React from 'react'

const Form = ({ onSubmit, totalHours, totalOnChange, sleepOnChange, sleepTime, deadlineOnChange, daysLeft, busyHours, formatDate, busyOnChange, resetHandler, errors }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label className={totalHours <= 0 ? 'required' : ''} htmlFor='total-hours'>How many hours does it take to finish this task?</label>
                <input className={totalHours <= 0 ? 'required' : ''} type='number' id='total-hours' onChange={totalOnChange} value={totalHours}></input>
                {errors.totalHours && (
                    <span>Please enter valid number</span>
                )}
            </div>
            <div>
                <label htmlFor='sleep-hours'>Your usual sleep time</label>
                <input type='number' id='sleep-hours' onChange={sleepOnChange} value={sleepTime}></input>
                {errors.sleepTime && (
                    <span>Please enter valid number</span>
                )}
            </div>
            <div>
                <label htmlFor='deadline'>When is the deadline?</label>
                <input type='date' id='deadline' onChange={deadlineOnChange}></input>
                {errors.daysLeft && (
                    <span>Please enter valid date</span>
                )}
            </div>
            {/* generates busy hour inputs based on days remaining */}
            {!errors.daysLeft && daysLeft && totalHours > 0 && sleepTime > 0 && sleepTime < 24 && (
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
                                    <input type='number' value={hours} onChange={(e) => busyOnChange(e, index)} ></input>
                                    {errors.busyHours[index] && (
                                        <span>Please enter valid number</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <button type='submit'>Submit</button>
            <button type='reset' onClick={resetHandler}>Reset</button>
        </form>
    )
}

export default Form