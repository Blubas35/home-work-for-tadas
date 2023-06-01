import React from 'react'
import './Style/Form.css'

const Form = ({ onSubmit, totalHours, totalOnChange, sleepOnChange, sleepTime, deadlineOnChange, daysLeft, busyHours, formatDate, busyOnChange, resetHandler, errors }) => {
    return (
        <form onSubmit={onSubmit} className='main-form'>
            <div className='initial-inputs'>
                <div className='form-control'>
                    <label className={errors.totalHours ? 'required' : ''} htmlFor='total-hours'>How many hours does it take to finish this task?</label>
                    <input className={errors.totalHours ? 'required' : 'input'} type='number' id='total-hours' onChange={totalOnChange} value={totalHours}></input>
                    {errors.totalHours && (
                        <span className={errors.totalHours ? 'required' : ''}>Please enter valid number</span>
                    )}
                </div>
                <div className='form-control'>
                    <label className={errors.sleepTime ? 'required' : ''} htmlFor='sleep-hours'>Your usual sleep time</label>
                    <input className={errors.sleepTime ? 'required' : 'input'} type='number' id='sleep-hours' onChange={sleepOnChange} value={sleepTime}></input>
                    {errors.sleepTime && (
                        <span className={errors.sleepTime ? 'required' : ''}>Please enter valid number</span>
                    )}
                </div>
                <div className='form-control'>
                    <label className={errors.daysLeft ? 'required' : ''} htmlFor='deadline'>When is the deadline?</label>
                    <input className={errors.daysLeft ? 'required' : 'input'} type='date' id='deadline' onChange={deadlineOnChange}></input>
                    {errors.daysLeft && (
                        <span className={errors.daysLeft ? 'required' : ''}>Please enter valid date</span>
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
                                    <div className='form-control' key={index}>
                                        <h3>{formattedDate}</h3>
                                        <label className={errors.busyHours[index] ? 'required' : ''} htmlFor={`busy-hours-${index}`}>Busy hours that day?</label>
                                        <input className={errors.busyHours[index] ? 'required' : 'input'} type='number' value={hours} onChange={(e) => busyOnChange(e, index)} ></input>
                                        {errors.busyHours[index] && (
                                            <span className={errors.busyHours[index] ? 'required' : ''}>Please enter valid number</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                <div className='button-wrapper'>
                    <button type='submit'>Submit</button>
                    <button type='reset' onClick={resetHandler}>Reset</button>
                </div>
            </div>
        </form>
    )
}

export default Form