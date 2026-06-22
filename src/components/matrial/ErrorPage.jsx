import { useNavigate } from "react-router-dom"; // Note: should be react-router-dom

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FBF8F1] dark:bg-slate-900 flex items-center justify-center transition-colors duration-300">
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:border dark:border-slate-700 max-w-md">

                <div className="text-8xl mb-4">😢</div>
                <h1 className="text-4xl font-extrabold text-emerald-800 dark:text-emerald-400 mb-2">404</h1>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">الصفحة غير موجودة</h2>

                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all w-full"
                >
                    العودة للصفحة الرئيسية
                </button>

            </div>
        </div>
    );
}