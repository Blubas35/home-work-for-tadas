import React from 'react'
import './Style/Form.css'

const Form = ({ onSubmit, totalHours, totalOnChange, sleepOnChange, sleepTime, deadline, deadlineOnChange, initialSubmitHandler, busyInputs, handleRadioChange, radio, daysLeft, backButtonHandler, busyHours, formatDate, busyOnChange, resetHandler, errors }) => {
    return (
        <form className='main-form'>
            <div className='initial-inputs'>
                {!busyInputs && (
                    <>
                        <div className='form-control'>
                            <label className={errors.totalHours ? 'required' : ''} htmlFor='total-hours'>How many hours does it take to finish this task?</label>
                            <input className={errors.totalHours ? 'required input' : 'input'} type='number' id='total-hours' onChange={totalOnChange} value={totalHours}></input>
                            {errors.totalHours && (
                                <span className={errors.totalHours ? 'required' : ''}>Please enter valid number</span>
                            )}
                        </div>
                        <div className='form-control'>
                            <label className={errors.sleepTime ? 'required' : ''} htmlFor='sleep-hours'>Your usual sleep time</label>
                            <input className={errors.sleepTime ? 'required input' : 'input'} type='number' id='sleep-hours' onChange={sleepOnChange} value={sleepTime}></input>
                            {errors.sleepTime && (
                                <span className={errors.sleepTime ? 'required' : ''}>Please enter valid number</span>
                            )}
                        </div>
                        <div className='form-control'>
                            <label className={errors.daysLeft ? 'required' : ''} htmlFor='deadline'>When is the deadline?</label>
                            <input className={errors.daysLeft ? 'required input' : 'input'} type='date' id='deadline' onChange={deadlineOnChange} value={deadline}></input>
                            {errors.daysLeft && (
                                <span className={errors.daysLeft ? 'required' : ''}>Please enter valid date</span>
                            )}
                        </div>
                        <fieldset>
                            <legend>Select the workload:</legend>
                            <div className='form-control'>
                                <label htmlFor='asap'>ASAP</label>
                                <input
                                    type='radio'
                                    id='asap'
                                    value='asap'
                                    name='workload'
                                    checked={radio === 'asap'}
                                    onChange={handleRadioChange}
                                ></input>
                            </div>
                            <div className='form-control'>
                                <label htmlFor='equal'>Equal</label>
                                <input
                                    type='radio'
                                    id='equal'
                                    value='equal'
                                    name='workload'
                                    checked={radio === 'equal'}
                                    onChange={handleRadioChange}
                                ></input>
                            </div>
                        </fieldset>
                        <div className='button-wrapper'>
                            <button onClick={initialSubmitHandler}>Confirm</button>
                        </div>
                    </>
                )}
                {/* generates busy hour inputs based on days remaining */}
                {!errors.daysLeft && busyInputs && daysLeft && totalHours > 0 && sleepTime > 0 && sleepTime < 24 && (
                    <>
                        <div className='back-button-wrapper'>
                            <button className='back-button' onClick={backButtonHandler}>
                                <span></span>
                            </button>
                        </div>

                        <div className='days-left-wrapper'>
                            <h3>{daysLeft ? `Days left until deadline: ${daysLeft}` : ''}</h3>
                        </div>
                        <h2 className='title'>State your busy hours on day:</h2>
                        <div className='busy-inputs'>
                            {busyHours.map((hours, index) => {
                                if (hours === '') {
                                    hours = '0'
                                }
                                const formattedDate = formatDate(index)

                                return (
                                    <div className='form-control' key={index}>
                                        <h3 className='date'>{formattedDate}</h3>
                                        <label className={errors.busyHours[index] ? 'required' : ''} htmlFor={`busy-hours-${index}`}>Busy hours</label>
                                        <input className={errors.busyHours[index] ? 'required input' : 'input'} type='number' value={hours} onChange={(e) => busyOnChange(e, index)} ></input>
                                        {errors.busyHours[index] && (
                                            <span className={errors.busyHours[index] ? 'required' : ''}>Please enter valid number</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className='button-wrapper'>
                            <button type='submit' onClick={onSubmit}>Submit</button>
                            <button type='reset' onClick={resetHandler}>Reset</button>
                        </div>
                    </>
                )}
            </div>
        </form>
    )
}

export default Form