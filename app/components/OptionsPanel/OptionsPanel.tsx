// Container of all option components.

import styles from './OptionsPanel.module.css'

interface OptionsPanelProps {
    workTime: number,
    breakTime: number,
    modifyWorkTime: (diff: number) => void,
    modifyBreakTime: (diff: number) => void
}

export default function OptionsPanel({workTime, breakTime, modifyWorkTime,modifyBreakTime}: OptionsPanelProps) {
    return (
        <div className={styles.optionsPanel} onClick={ (e) => e.stopPropagation() }>
          <h1>Options</h1>
          <hr></hr>
          <h1 className={styles.optionsTimerHeader}>Set Timer</h1>
          <div className={styles.optionsTimer}>
            <div>
              <p>Work Time</p>
              <h1 className={styles.optionsTimerDisplay}>{ Math.floor(workTime / 60).toString().padStart(2, "0") }
                : { (workTime % 60).toString().padStart(2, "0") }
              </h1>
              <button onClick={ () => modifyWorkTime(60) }>+1 min</button>
              <button onClick={ () => modifyWorkTime(-60) }>-1 min</button>
            </div>

            <div>
              <p>Break Time</p>
              <h1 className={styles.optionsTimerDisplay}>{ Math.floor(breakTime / 60).toString().padStart(2, "0") }
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