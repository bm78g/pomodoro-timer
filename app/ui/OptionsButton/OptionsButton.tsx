// Button for opening the options panel.

import styles from './OptionsButton.module.css'
import optionsLogo from '../../../public/images/options_logo.png'

interface OptionsButtonProps {
    onClick: () => void
}

export default function OptionsButton({onClick}: OptionsButtonProps) {
    return <img className={styles.optionsBtn} src={ optionsLogo.src } onClick={onClick}></img>
}