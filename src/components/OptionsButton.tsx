import optionsLogo from '../assets/options_logo.png'

interface OptionsButtonProps {
    onClick: () => void
}

export default function OptionsButton({onClick}: OptionsButtonProps) {
    return <img id="options-btn" src={optionsLogo} onClick={onClick}></img>
}