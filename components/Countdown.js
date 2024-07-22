import React, { useState, useRef, useEffect } from "react";
import { Text } from "react-native";

const useAuctionTimer = (endDate) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endDate) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const timerRef = useRef(null);

    useEffect(() => {
        const updateTimer = () => {
            setTimeLeft(calculateTimeLeft());
        };

        timerRef.current = setInterval(updateTimer, 1000);

        return () => clearInterval(timerRef.current);
    }, [endDate]);

    return timeLeft;
};


export default function Countdown({ endDate }) {
    const timeLeft = useAuctionTimer(endDate);
    // const [countdown, setCountDown] = useState({
    //     days: undefined,
    //     hours: undefined,
    //     minutes: undefined,
    //     seconds: undefined
    // });

    // const calculateTimeLeft = () => {
    //     const difference = endDate - new Date();
    //     let timeLeft = {};

    //     if (difference > 0) {
    //         timeLeft = {
    //             days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //             hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //             minutes: Math.floor((difference / 1000 / 60) % 60),
    //             seconds: Math.floor((difference / 1000) % 60),
    //         };
    //     }
    //     return timeLeft;
    // };
    // const intervalRef = useRef(null);
    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // useEffect(() => {
    //     clearInterval(intervalRef.current);
    //     intervalRef.current = setInterval(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 1000);
    // }, []);

    return (
        <Text>{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</Text>
    );
}