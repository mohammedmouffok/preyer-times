
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "../../hooks/UseTheme";

export default function ThemeToggle() {
    const { darkMode, toggleDarkMode } = useTheme()

    return (
        <button
            onClick={toggleDarkMode}
            title={darkMode ? "الوضع النهاري" : "الوضع الليلي"}
            className="cursor-pointer text-2xl p-2 rounded-full transition-all duration-300 flex items-center justify-center
                       bg-emerald-100 text-emerald-800 hover:bg-emerald-200 
                       dark:bg-slate-800 dark:text-emerald-400 dark:hover:bg-slate-700 shadow-sm border border-transparent dark:border-slate-600"
        >
            {darkMode ? <CiLight /> : <MdDarkMode />}
        </button>
    );
}