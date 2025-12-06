import { useState, useEffect, useRef } from 'react'
import './App.css'

import pomodoroLogo from './assets/pomodoro_logo.png'

import OptionsButton from './components/OptionsButton'
import TimerDisplay from './components/TimerDisplay'

export default function App() {
  const [workTime, setWorkTime] = useState(1500)
  const [breakTime, setBreakTime] = useState(300)
  const [working, setWorking] = useState(true)

  const [seconds, setSeconds] = useState(workTime)
  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  useEffect(() => { runningRef.current = running }, [running])
  const workingRef = useRef(working)
  useEffect(() => { workingRef.current = working }, [working])
  const workTimeRef = useRef(workTime)
  useEffect(() => { workTimeRef.current = workTime }, [workTime])
  const breakTimeRef = useRef(breakTime)
  useEffect(() => { breakTimeRef.current = breakTime }, [breakTime])
  const secondsRef = useRef(seconds)
  useEffect(() => { secondsRef.current = seconds }, [seconds])

  const [showOptions, setShowOptions] = useState(false)

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
        progress = workingRef.current ? workTimeRef.current : breakTimeRef.current
        return 0
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  let minutes = Math.floor(seconds / 60) % 60
  let hours = Math.floor(seconds / 3600)
  let secondsFormat = seconds % 60
  
  let maxTime = working ? workTime : breakTime
  let progress = maxTime - seconds

  // Commented temporarily because the control buttons are removed.
  const modifyWorkTime = (diff: number) => {
    const newWorkTime = Math.max(0, workTime + diff)
    setWorkTime(newWorkTime)
    if (workingRef.current)
      setSeconds(newWorkTime)
    progress = newWorkTime - secondsRef.current
  }

  const modifyBreakTime = (diff: number) => {
    const newBreakTime = Math.max(0, breakTime + diff)
    setBreakTime(newBreakTime)
    if (!workingRef.current)
      setSeconds(newBreakTime)
    progress = newBreakTime - secondsRef.current
  }

  const resetTime = () => {
    if (workingRef.current)
      setSeconds(workTime)
    else
      setSeconds(breakTime)
    setRunning(false)
  }

  const toggleOptions = (enable: boolean) => {
    setShowOptions(enable)
  }

  return (
    <>
      {showOptions && (
        <div className='options-block' onClick={() => toggleOptions(false)}>
          <div className="options-panel" onClick={(e) => e.stopPropagation()}>
            <h1>Work Time</h1>
            <h1>{Math.floor(workTime / 60).toString().padStart(2, "0")}
              : {(workTime % 60).toString().padStart(2, "0")}
            </h1>
            <button onClick={() => modifyWorkTime(60)}>+1 min</button>
            <button onClick={() => modifyWorkTime(-60)}>-1 min</button>

            <h1>Break Time</h1>
            <h1>{Math.floor(breakTime / 60).toString().padStart(2, "0")}
              : {(breakTime % 60).toString().padStart(2, "0")}
            </h1>
            <button onClick={() => modifyBreakTime(60)}>+1 min</button>
            <button onClick={() => modifyBreakTime(-60)}>-1 min</button>
          </div>
        </div>
      )}
      <div className='header-block'>
        <img id='logo' src={pomodoroLogo} onClick={() => window.location.reload()}></img>
        <OptionsButton onClick={() => toggleOptions(true)}/>
      </div>
      <div className='hero-block'>
        <div className='hero-content'>
          <p className='decor-text p-1'>working hard...?</p>
          <h1 className='title-text'>Pomodoro Timer</h1>
          <TimerDisplay hours={hours} minutes={minutes} seconds={secondsFormat}/>
          <div className='control-btn-container'>
            <button className='control-btn' onClick={() => setRunning(true)}>Start</button>
            <button className='control-btn' onClick={() => setRunning(false)}>Stop</button>
            <button className='control-btn' onClick={() => resetTime()}>Reset</button>
            <button onClick={() => setSeconds(1)}>Set sec to 1</button>
          </div>
          <input
            type="range"
            min="0"
            max={maxTime}
            value={progress}
            readOnly
            style={{ width: "300px" }}/>
          <p className='decor-text p-2'>or hardly working?</p>
        </div>
      </div>
    </>
  )
}
