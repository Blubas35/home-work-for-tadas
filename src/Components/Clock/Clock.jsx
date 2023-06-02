import React, { useEffect, useRef } from 'react';
import './Style/Clock.css';

const Clock = () => {
    const secondHandRef = useRef(null);
    const minsHandRef = useRef(null);
    const hourHandRef = useRef(null);

    useEffect(() => {
        const setDate = () => {
            const now = new Date();

            const seconds = now.getSeconds();
            const secondsDegrees = ((seconds / 60) * 360) + 90;
            secondHandRef.current.style.transform = `rotate(${secondsDegrees}deg)`;

            const mins = now.getMinutes();
            const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
            minsHandRef.current.style.transform = `rotate(${minsDegrees}deg)`;

            const hour = now.getHours();
            const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
            hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`;
        };

        const interval = setInterval(setDate, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            <div className="outer-clock-face">
                <div className="marking marking-one"></div>
                <div className="marking marking-two"></div>
                <div className="marking marking-three"></div>
                <div className="marking marking-four"></div>
                <div className="inner-clock-face">
                    <div ref={hourHandRef} className="hand hour-hand"></div>
                    <div ref={minsHandRef} className="hand min-hand"></div>
                    <div ref={secondHandRef} className="hand second-hand"></div>
                </div>
            </div>
        </div>
    );
};

export default Clock;