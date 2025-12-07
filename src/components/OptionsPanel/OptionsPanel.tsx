// Container of all option components.

interface OptionsPanelProps {
    workTime: number,
    breakTime: number,
    modifyWorkTime: (diff: number) => void,
    modifyBreakTime: (diff: number) => void
}

export default function OptionsPanel({workTime, breakTime, modifyWorkTime,modifyBreakTime}: OptionsPanelProps) {
    return (
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
    )
}