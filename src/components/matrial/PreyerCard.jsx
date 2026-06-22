import { memo } from "react";

function PreyerCard({ img, title, time }) {
    return (
        <div className="bg-[#FBF8F1] dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl dark:shadow-none dark:border dark:border-slate-700 hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="flex flex-col items-center justify-center p-3">
                {/* Image Container */}
                <div className="w-full h-[120px] rounded-xl overflow-hidden shadow-sm mb-4">
                    <img className="w-full h-full object-cover" src={img} alt={title} />
                </div>

                {/* Text Container */}
                <div className="flex flex-col items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                    <span className="opacity-90">{title}</span>
                    <span className="text-2xl font-mono text-emerald-700 dark:text-emerald-400">{time}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(PreyerCard);