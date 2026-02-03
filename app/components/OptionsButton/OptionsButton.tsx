// Button for opening the options panel.

import './OptionsButton.css'
import optionsLogo from '../../../public/images/options_logo.png'

interface OptionsButtonProps {
    onClick: () => void
}

export default function OptionsButton({onClick}: OptionsButtonProps) {
    return <img id="options-btn" src={ optionsLogo.src } onClick={onClick}></img>
}