import { signInAction } from "../actions/auth";

export default function SignUpPage() {
    const inputStyle = "bg-gray-100 rounded-md w-50 h-10 p-1";

    return (
        <div>
            <div>
                <form action={signInAction} className="flex flex-col items-center justify-center h-screen gap-4">
                    <input type="email" name="email" placeholder="Email" required className={inputStyle}></input>
                    <input type="password" name="password" placeholder="Password" required className={inputStyle}></input>
                    <button type="submit"
                        className="bg-blue-400 text-white w-25 h-10 rounded-lg hover:bg-blue-500 cursor-pointer">
                            Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}