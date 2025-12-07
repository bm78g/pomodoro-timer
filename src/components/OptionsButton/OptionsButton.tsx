// Button for opening the options panel.

import optionsLogo from '../../assets/images/options_logo.png'

interface OptionsButtonProps {
    onClick: () => void
}

export default function OptionsButton({onClick}: OptionsButtonProps) {
    return <img id="options-btn" src={optionsLogo} onClick={onClick}></img>
}