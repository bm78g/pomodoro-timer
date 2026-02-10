'use client'

import { useState } from 'react'

// Stylesheets
import styles from './TimerDashboard.module.css'

// Assets
import pomodoroLogo from '@/public/images/pomodoro_logo.png'

// Components
import OptionsPanel from '@/app/ui/OptionsPanel/OptionsPanel'
import OptionsButton from '@/app/ui/OptionsButton/OptionsButton'
import TimerDisplay from '@/app/ui/TimerDisplay/TimerDisplay'
import ControlButton from '@/app/ui/ControlButton/ControlButton'

// Hooks
import { usePomodoroTimer } from '@/app/hooks/usePomodoroTimer'
import SignUpButton from '../SignUpButton'
import SignUpPanel from '../SignUpPanel'
import SignOutButton from '../SignOutButton'
import LogInButton from '../LogInButton'
import LogInPanel from '../LogInPanel'

interface DashboardProps {
    signedIn: boolean;
    username: string | undefined;
}

export default function TimerDashboard({ signedIn, username }: DashboardProps) {
    const {
        workTime,
        breakTime,
        working,
        seconds,

        start,
        stop,
        reset,
        setSecondsToOne,
        modifyWork,
        modifyBreak
    } = usePomodoroTimer()

    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = (enable: boolean) => {
        setShowOptions(enable)
    }

    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogIn, setShowLogIn] = useState(false)

    let minutes = Math.floor(seconds / 60) % 60
    let hours = Math.floor(seconds / 3600)
    let secondsFormat = seconds % 60
    
    // Progress display purpose.
    let maxTime = working ? workTime : breakTime
    let progress = maxTime - seconds

    return (
        <div className={styles.app}>
            {showOptions && (
                <div className={styles.panelOverlay} onClick={() => setShowOptions(false)}>
                    <OptionsPanel
                        workTime={ workTime }
                        breakTime={ breakTime }
                        modifyBreakTime={ modifyBreak }
                        modifyWorkTime={ modifyWork }
                    />
                </div>
            )}

            {showSignUp && (
                <div className={styles.panelOverlay} onClick={() => setShowSignUp(false)}>
                    <SignUpPanel />
                </div>
            )}

            {showLogIn && (
                <div className={styles.panelOverlay} onClick={() => setShowLogIn(false)}>
                    <LogInPanel />
                </div>
            )}

            <div className={styles.headerBlock}>
                <img className={styles.logo} src={ pomodoroLogo.src } onClick={() => window.location.reload()}></img>
                {
                    signedIn ?
                        <div className={styles.authButtons}>
                            <div className='text-gray-500 font-semibold'>{username}</div>
                            <SignOutButton />
                        </div> :
                        <div className={styles.authButtons}>
                            <SignUpButton setShowSignUp={ setShowSignUp } />
                            <LogInButton setShowLogIn={ setShowLogIn } />
                        </div>
                }
            </div>

            <div className={styles.heroBlock}>
                <div className={styles.heroContent}>
                <OptionsButton onClick={() => toggleOptions(true)}/>

                <p className={styles.decorText + ' ' + styles.p1}>working hard...?</p>
                <h1 className={styles.titleText}>Pomodoro Timer</h1>
                <TimerDisplay hours={ hours } minutes={ minutes } seconds={ secondsFormat }/>

                <div>
                    <ControlButton label='Start' onClick={start} />
                    <ControlButton label='Stop' onClick={stop} />
                    <ControlButton label='Reset' onClick={reset} />
                    {/* <ControlButton label='Set 1' onClick={setSecondsToOne} /> */}
                </div>

                <input className={styles.progressBar}
                    type="range"
                    min="0"
                    max={ maxTime }
                    value={ progress }
                    readOnly
                />
                    
                <p className={styles.decorText + ' ' + styles.p2}>or hardly working?</p>
                </div>
            </div>
        </div>
    )
}
