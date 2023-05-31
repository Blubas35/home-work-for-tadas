import React, { useState, useEffect } from 'react';

const Demo2 = () => {
    const [taskTime, setTaskTime] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [freeTime, setFreeTime] = useState([]);
    const [taskSchedule, setTaskSchedule] = useState([]);

    const handleFreeTimeChange = (index, value) => {
        const updatedFreeTime = [...freeTime];
        updatedFreeTime[index] = value;
        setFreeTime(updatedFreeTime);
    };

    const calculateTaskSchedule = () => {
        const startDate = new Date();
        const endDate = new Date(dueDate);
        const daysUntilDueDate = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        /*+1 nes su sita funkcija skaiciuojant jeigu yra maziau negu 24h likusios tai rasys 0 zero days left*/
        let remainingTime = taskTime;
        let schedule = [];

        for (let i = 0; i < daysUntilDueDate; i++) {
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
    };

    return (
        <div>
            <label>Task Time (hours):</label>
            <input type="number" value={taskTime} onChange={(e) => setTaskTime(Number(e.target.value))} />

            <label>Due Date:</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

            <div>
                <label>Free Time per Day (hours):</label>
                {[...Array(taskSchedule.length)].map((_, index) => (
                    <input
                        key={index}
                        type="number"
                        value={freeTime[index] || ""}
                        onChange={(e) => handleFreeTimeChange(index, Number(e.target.value))}
                    />
                ))}
            </div>

            <button onClick={calculateTaskSchedule}>Calculate Schedule</button>

            <ul>
                {taskSchedule.map((item) => (
                    <>
                        <li key={item.day}>Day {item.day}: {item.hours} hours</li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default Demo2