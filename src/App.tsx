import { useState, useEffect, useRef } from 'react'
import './App.css'

import pomodoroLogo from './assets/pomodoro_logo.png'

import OptionsButton from './components/OptionsButton'
import TimerDisplay from './components/TimerDisplay'

export default function App() {
  const [startTime, setStartTime] = useState(1500)

  const [seconds, setSeconds] = useState(startTime)
  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  useEffect(() => { runningRef.current = running }, [running])

  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!runningRef.current) return
      setSeconds(prev => {
        if (prev > 0)
          return prev - 1
        clearInterval(intervalId)
        return 0
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  let minutes = Math.floor(seconds / 60) % 60
  let hours = Math.floor(seconds / 3600)
  let secondsFormat = seconds % 60

  let progress = startTime - seconds

  // Commented temporarily because the control buttons are removed.
  // const modifyTime = (diff: number) => {
  //   setSeconds(prev => {
  //     if (prev + diff < 0)
  //       return 0
  //     return prev + diff
  //   })
  //   setStartTime(prev => {
  //     if (prev + diff < 0)
  //       return 0
  //     return prev + diff
  //   })
  //   console.log(seconds, startTime)
  //   progress = startTime - seconds
  // }

  const toggleOptions = (enable: boolean) => {
    setShowOptions(enable)
  }

  return (
    <>
      {showOptions && (
        <div className='options-block' onClick={() => toggleOptions(false)}>
          <div className="options-panel" onClick={(e) => e.stopPropagation()}></div>
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
            <button className='control-btn' onClick={() => {setSeconds(startTime); setRunning(false)}}>Reset</button>
          </div>
          <input
            type="range"
            min="0"
            max={startTime}
            value={progress}
            readOnly
            style={{ width: "300px" }}/>
          <p className='decor-text p-2'>or hardly working?</p>
        </div>
      </div>
    </>
  )
}
