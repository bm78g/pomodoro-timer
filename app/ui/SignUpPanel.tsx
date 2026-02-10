import { signUpAction } from "../actions/auth";

export default function SignUpPanel() {
    const fieldStyle = "w-50 h-10 m-2 p-2 bg-transparent border-2 border-gray-400/50 rounded-md";
    
    return (
        <div onClick={ (e) => e.stopPropagation() }
            className="w-100 h-100 bg-[#e0e0e0] rounded-lg flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold text-gray-700 mb-8">Sign Up</h1>
            <form action={signUpAction} className="flex flex-col items-center gap-2">
                <input type="text" name="name" placeholder="Name" required className={fieldStyle}></input>
                <input type="email" name="email" placeholder="Email" required className={fieldStyle}></input>
                <input type="password" name="password" placeholder="Password" required className={fieldStyle}></input>
                <button type="submit"
                    className="w-25 h-9 rounded-md bg-transparent border-2 border-gray-400/50 text-gray-600 hover:bg-gray-500/10">
                        Sign Up
                </button>
            </form>
        </div>
    )
}