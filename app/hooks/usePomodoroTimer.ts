// Hook for the pomodoro timer logic.

import { useState, useRef, useEffect } from 'react'

export function usePomodoroTimer() {
    const [workTime, setWorkTime] = useState(1500)
    const [breakTime, setBreakTime] = useState(300)
    const [working, setWorking] = useState(true)
    const [seconds, setSeconds] = useState(1500)
    const [running, setRunning] = useState(false)

    // Updating workTimeRef and breakTimeRef also updates the current running seconds if conditions are met.
    // Previous values are compaared with the max values to check if the timer has been run.
    const workTimeRef = useRef(workTime)
    const prevWorkTimeRef = useRef(workTime)
    useEffect(() => {
        prevWorkTimeRef.current = workTimeRef.current
        workTimeRef.current = workTime
        if (workingRef.current && !runningRef.current && prevWorkTimeRef.current == secondsRef.current)
            setSeconds(workTimeRef.current)
    }, [workTime])

    const breakTimeRef = useRef(breakTime)
    const prevBreakTimeRef = useRef(breakTime)
    useEffect(() => {
        prevBreakTimeRef.current = breakTimeRef.current
        breakTimeRef.current = breakTime
        if (!workingRef.current && !runningRef.current && prevBreakTimeRef.current == secondsRef.current)
            setSeconds(breakTimeRef.current)
    }, [breakTime])

    const workingRef = useRef(working)
    useEffect(() => { workingRef.current = working }, [working])
    const secondsRef = useRef(seconds)
    useEffect(() => {secondsRef.current = seconds}, [seconds])
    const runningRef = useRef(running)
    useEffect(() => { runningRef.current = running }, [running])

    // Loads in audio file.
    const alarmRef = useRef<HTMLAudioElement | null>(null)
    useEffect(() => {
        alarmRef.current = new Audio();
        alarmRef.current.src = 'sounds/alarm.wav';
        alarmRef.current.load()
    }, [])

    useEffect(() => {
        // Increments time or resets to the next timer, runs every second perpetually.
        const intervalId = setInterval(() => {
        if (!runningRef.current) return
        setSeconds(prev => {
            if (prev > 0)
                return prev - 1

            // If timer reaches 0:
            const nextWorking = !workingRef.current
            setWorking(nextWorking)
            const nextTime = nextWorking ? workTimeRef.current : breakTimeRef.current
            setSeconds(nextTime)

            alarmRef.current?.play()

            return 0
        })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const start = () => {
        setRunning(true)
        console.log('start')
    }
    const stop = () => {
        setRunning(false)
    }
    const reset = () => {
        setSeconds(workingRef.current ? workTimeRef.current : breakTimeRef.current)
        setRunning(false)   
    }
    // Debug-purpose, sets running second to 1.
    const setSecondsToOne = () => setSeconds(1)

    // Used in settings to change max time.
    const modifyWork = (amount: number) => setWorkTime(time => Math.max(0, time + amount))
    const modifyBreak = (amount: number) => setBreakTime(time => Math.max(0, time + amount))

    return {
        workTime,
        breakTime,
        working,
        seconds,

        start,
        stop,
        reset,
        setSecondsToOne,
        modifyWork,
        modifyBreak
    }
}