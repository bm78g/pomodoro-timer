// Button for start/stop/resetting the timer.

import './ControlButton.css'

interface ControlButtonProps {
    label: string,
    onClick: () => void
}

export default function ControlButton({label, onClick}: ControlButtonProps) {
    return (
        <button className="control-btn" onClick={ onClick }>{label}</button>
    )
}