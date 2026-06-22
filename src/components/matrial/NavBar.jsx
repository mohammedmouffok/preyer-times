import ThemeToggle from "./ThemeToogle"
// import { useNavigate } from "react-router"


// onClick = { navigate('/') }

export default function NavBar() {
    // const navigate =useNavigate()
    return (


        <nav className="w-full bg-[#FBF8F1] dark:bg-slate-900 transition-colors duration-300 border-b border-emerald-100 dark:border-slate-800 shadow-sm" dir="rtl">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">


                <div className="flex items-center gap-3 cursor-pointer">
                    <span className="text-3xl drop-shadow-sm">🕌</span>
                    <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 tracking-wide">
                        مواقيت الصلاة
                    </h1>
                </div>


                <ThemeToggle />

            </div>
        </nav>
    )
}