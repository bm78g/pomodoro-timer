// Container of all option components.

import styles from './OptionsPanel.module.css'

interface OptionsPanelProps {
    workTime: number,
    breakTime: number,
    modifyWorkTime: (diff: number) => void,
    modifyBreakTime: (diff: number) => void
}

export default function OptionsPanel({workTime, breakTime, modifyWorkTime,modifyBreakTime}: OptionsPanelProps) {
    const buttonStyle = 'border-1 border-gray-500 rounded-md hover:bg-gray-400/30 cursor-pointer';
    const timerStyle = 'text-2xl';

    return (
        <div className={styles.optionsPanel} onClick={ (e) => e.stopPropagation() }>
          <h1 className='mt-5 text-2xl'>Options</h1>
          <hr></hr>
          <h1 className={styles.optionsTimerHeader}>Set Timer</h1>
          <div className={styles.optionsTimer}>
            <div>
              <p>Work Time</p>
              <h1 className={timerStyle}>{ Math.floor(workTime / 60).toString().padStart(2, "0") }
                : { (workTime % 60).toString().padStart(2, "0") }
              </h1>
              <button onClick={ () => modifyWorkTime(60) } className={buttonStyle}>+1 min</button>
              <button onClick={ () => modifyWorkTime(-60) } className={buttonStyle}>-1 min</button>
            </div>

            <div>
              <p>Break Time</p>
              <h1 className={timerStyle}>{ Math.floor(breakTime / 60).toString().padStart(2, "0") }
                : { (breakTime % 60).toString().padStart(2, "0") }
              </h1>
              <button onClick={ () => modifyBreakTime(60) } className={buttonStyle}>+1 min</button>
              <button onClick={ () => modifyBreakTime(-60) } className={buttonStyle}>-1 min</button>
            </div>
          </div>
          <hr></hr>
        </div>
    )
}