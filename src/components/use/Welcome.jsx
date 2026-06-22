import { useNavigate } from "react-router-dom"


export default function Welcome() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center flex-1 h-[70vh] px-4 text-center bg">
            <div className="w-24 h-24 mb-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-5xl shadow-inner">
                🕌
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white">
                مرحباً بك في مواقيت الصلاة
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed">
                تطبيق بسيط وأنيق لمتابعة أوقات الصلاة ومعرفة الوقت المتبقي للصلاة القادمة بكل دقة وعناية.
            </p>
            <button
                onClick={()=>navigate("/times")}
                className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-xl font-bold"
            >
                البدء الآن
            </button>
        </div>
    )
}