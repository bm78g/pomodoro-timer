interface SignUpButtonProps {
    setShowSignUp: any;
}

export default function SignUpButton({ setShowSignUp }: SignUpButtonProps) {
    const enableSignUp = () => {
        setShowSignUp(true);
    }

    return (
        <button onClick={enableSignUp}
            className="mt-16 w-20 h-9 bg-transparent rounded-lg text-gray-700 border-gray-400/50 border-2 hover:bg-gray-500/10 cursor-pointer">
                Sign Up
        </button>
    )
}