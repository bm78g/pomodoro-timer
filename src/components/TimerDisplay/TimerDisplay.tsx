// Text that displays the timer in format.

import './TimerDisplay.css'

interface TimerInterface {
    seconds: number,
    minutes: number,
    hours: number
}

export default function TimerDisplay({seconds, minutes, hours}: TimerInterface) {
    return (
        <h1 id="timer-display">{ hours.toString().padStart(2, "0") }
        : { minutes.toString().padStart(2, "0") }
        : { seconds.toString().padStart(2, "0") }</h1>
    )
}