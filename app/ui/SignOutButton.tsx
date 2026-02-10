import { signOutAction } from "../actions/auth";

export default function SignUpButton() {
    return (
        <form>
            <button formAction={ signOutAction }
                className="mt-16 w-20 h-9 bg-transparent rounded-lg text-gray-700 border-gray-400/50 border-2 hover:bg-gray-500/10 cursor-pointer">
                    Sign Out
            </button>
        </form>
    )
}