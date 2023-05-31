import React from 'react'

const Form = ({ onSubmit, totalHours, totalOnChange, sleepOnChange, sleepTime, deadlineOnChange, daysLeft, busyHours, formatDate, busyOnChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label className={totalHours ? '' : 'required'} htmlFor='total-hours'>How many hours does it take to finish this task?</label>
                <input type='number' id='total-hours' onChange={totalOnChange}></input>
            </div>
            <div>
                <label htmlFor='sleep-hours'>Your usual sleep time</label>
                <input type='number' id='sleep-hours' onChange={sleepOnChange} value={sleepTime}></input>
            </div>
            <div>
                <label htmlFor='deadline'>When is the deadline?</label>
                <input type='date' id='deadline' onChange={deadlineOnChange}></input>
            </div>
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
                                    <input type='number' value={hours} onChange={(e) => busyOnChange(e, index)} ></input>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <button type='submit'>Submit</button>
            {/* <button type='reset'>Reset</button> */}
        </form>
    )
}

export default Form