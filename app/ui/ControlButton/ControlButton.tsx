// Button for start/stop/resetting the timer.

interface ControlButtonProps {
    label: string,
    onClick: () => void
}

export default function ControlButton({label, onClick}: ControlButtonProps) {
    return (
        <button
            className='bg-transparent border-2 border-gray-400/50 rounded-md w-20 h-7 hover:bg-gray-400/50 cursor-pointer'
            onClick={ onClick }>
                {label}
        </button>
    )
}