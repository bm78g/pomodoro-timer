import { useState, useRef, useEffect } from 'react'

import alarmSrc from '../assets/sounds/alarm.wav'

export function usePomodoroTimer() {
    const [workTime, setWorkTime] = useState(1500)
    const [breakTime, setBreakTime] = useState(300)
    const [working, setWorking] = useState(true)
    const [seconds, setSeconds] = useState(1500)
    const [running, setRunning] = useState(false)

    const runningRef = useRef(running)
    useEffect(() => { runningRef.current = running }, [running])

    const workingRef = useRef(working)
    useEffect(() => { workingRef.current = working }, [working])

    const workTimeRef = useRef(workTime)
    useEffect(() => { workTimeRef.current = workTime }, [workTime])

    const breakTimeRef = useRef(breakTime)
    useEffect(() => { breakTimeRef.current = breakTime}, [breakTime])

    const secondsRef = useRef(seconds)
    useEffect(() => {secondsRef.current = seconds}, [seconds])

    const alarmRef = useRef<HTMLAudioElement | null>(null)
    useEffect(() => {
        alarmRef.current = new Audio(alarmSrc)
        alarmRef.current.load()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
        if (!runningRef.current) return
        setSeconds(prev => {
            if (prev > 0)
                return prev - 1

            if (workingRef.current){
                setWorking(false)
                setSeconds(breakTimeRef.current)
            } else {
                setWorking(true)
                setSeconds(workTimeRef.current)
            }
            return 0
        })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const start = () => setRunning(true)
    const stop = () => setRunning(false)
    const reset = () => {
        setSeconds(workingRef.current ? workTimeRef.current : breakTimeRef.current)
        setRunning(false)   
    }
    // Debug-purpose
    const setSecondsToOne = () => setSeconds(1)

    const modifyWork = (amount: number) =>
        setWorkTime(time => Math.max(0, time + amount))
    const modifyBreak = (amount: number) =>
        setBreakTime(time => Math.max(0, time + amount))

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