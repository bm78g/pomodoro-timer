'use client'

import { useState } from 'react'

// Stylesheets
import './App.css'

// Assets
import pomodoroLogo from '../public/images/pomodoro_logo.png'

// Components
import OptionsPanel from './components/OptionsPanel/OptionsPanel'
import OptionsButton from './components/OptionsButton/OptionsButton'
import TimerDisplay from './components/TimerDisplay/TimerDisplay'
import ControlButton from './components/ControlButton/ControlButton'

// Hooks
import { usePomodoroTimer } from './hooks/usePomodoroTimer'

export default function App() {
  const {
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
  } = usePomodoroTimer()

  const [showOptions, setShowOptions] = useState(false)
  const toggleOptions = (enable: boolean) => {
    setShowOptions(enable)
  }

  let minutes = Math.floor(seconds / 60) % 60
  let hours = Math.floor(seconds / 3600)
  let secondsFormat = seconds % 60
  
  // Progress display purpose.
  let maxTime = working ? workTime : breakTime
  let progress = maxTime - seconds

  return (
    <>
      {showOptions && (
        <div className='options-block' onClick={() => setShowOptions(false)}>
          <OptionsPanel
            workTime={ workTime }
            breakTime={ breakTime }
            modifyBreakTime={ modifyBreak }
            modifyWorkTime={ modifyWork }
          />
        </div>
      )}

      <div className='header-block'>
        <img id='logo' src={ pomodoroLogo.src } onClick={() => window.location.reload()}></img>
      </div>

      <div className='hero-block'>
        <div className='hero-content'>
          <OptionsButton onClick={() => toggleOptions(true)}/>

          <p className='decor-text p-1'>working hard...?</p>
          <h1 className='title-text'>Pomodoro Timer</h1>

          <TimerDisplay hours={ hours } minutes={ minutes } seconds={ secondsFormat }/>

          <div className='control-btn-container'>
            <ControlButton label='Start' onClick={start} />
            <ControlButton label='Stop' onClick={stop} />
            <ControlButton label='Reset' onClick={reset} />
            <ControlButton label='Set 1' onClick={setSecondsToOne} />
            {/*<ControlButton label='debug: set sec to 1' onClick={setSecondsToOne} />*/}
          </div>

          <input
            type="range"
            min="0"
            max={ maxTime }
            value={ progress }
            readOnly
            style={{ width: "300px" }}
          />
            
          <p className='decor-text p-2'>or hardly working?</p>
        </div>
      </div>
    </>
  )
}
