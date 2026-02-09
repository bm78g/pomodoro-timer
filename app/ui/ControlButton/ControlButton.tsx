// Button for start/stop/resetting the timer.

import styles from './ControlButton.module.css'

interface ControlButtonProps {
    label: string,
    onClick: () => void
}

export default function ControlButton({label, onClick}: ControlButtonProps) {
    return (
        <button className={styles.controlBtn} onClick={ onClick }>{label}</button>
    )
}