// Container of all option components.

import './OptionsPanel.css'

interface OptionsPanelProps {
    workTime: number,
    breakTime: number,
    modifyWorkTime: (diff: number) => void,
    modifyBreakTime: (diff: number) => void
}

export default function OptionsPanel({workTime, breakTime, modifyWorkTime,modifyBreakTime}: OptionsPanelProps) {
    return (
        <div className="options-panel" onClick={ (e) => e.stopPropagation() }>
          <h1>Options</h1>
          <hr></hr>
          <h1 className='options-timer-header'>Set Timer</h1>
          <div className='options-timer'>
            <div className='options-timer-worktime'>
              <p>Work Time</p>
              <h1 className='options-timer-display'>{ Math.floor(workTime / 60).toString().padStart(2, "0") }
                : { (workTime % 60).toString().padStart(2, "0") }
              </h1>
              <button onClick={ () => modifyWorkTime(60) }>+1 min</button>
              <button onClick={ () => modifyWorkTime(-60) }>-1 min</button>
            </div>

            <div className='options-timer-breaktime'>
              <p>Break Time</p>
              <h1 className='options-timer-display'>{ Math.floor(breakTime / 60).toString().padStart(2, "0") }
                : { (breakTime % 60).toString().padStart(2, "0") }
              </h1>
              <button onClick={ () => modifyBreakTime(60) }>+1 min</button>
              <button onClick={ () => modifyBreakTime(-60) }>-1 min</button>
            </div>
          </div>
          <hr></hr>
        </div>
    )
}