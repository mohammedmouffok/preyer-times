import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import "dayjs/locale/ar-dz"
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration"

dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.extend(duration)



import axios from "axios"
import PreyerCard from "../matrial/PreyerCard";
import Fajr from "../../../public/picture/Fajr.jpg";
import Dhuhr from "../../../public/picture/Dhuhr.jpg";
import Asr from "../../../public/picture/Asr.jpg";
import Maghrib from "../../../public/picture/Maghrib.jpg";
import Isha from "../../../public/picture/Isha.jpg";

const preyer = {
    Fajr: "03:58",
    Sunrise: "05:52",
    Dhuhr: "13:04",
    Asr: "16:53",
    Maghrib: "20:22",
    Isha: "22:03"
}

const arrayPreyer = [
    { id: "Fajr", preyerName: "الفجر" },
    { id: "Sunrise", preyerName: "الشروق" },
    { id: "Dhuhr", preyerName: "الظهر" },
    { id: "Asr", preyerName: "العصر" },
    { id: "Maghrib", preyerName: "المغرب" },
    { id: "Isha", preyerName: "العشاء" }
]




export default function Main() {
    useEffect(() => {
        dayjs.locale("ar-dz")
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [timings, setTimings] = useState(preyer)
    const [remainingTime,setRemainingTime] =useState("00:00:00")
    const [city, setCity] = useState({
        displayName: "تلمسان",
        apiName: "Tlemcen",
    })

    const [day, setDay] = useState(() => dayjs().format("MMM D YYYY | HH:mm:ss"))
    const [nextPreyerIndex, setNextPreyerIndex] = useState(0)




    useEffect(() => {
        async function getTime() {
            const date = dayjs().format('DD-MM-YYYY');
            try {
                setIsLoading(true)
                const responce = await axios.get(`https://api.aladhan.com/v1/timingsByCity/${date}?city=${city.apiName}&country=Dz`)
                setTimings(responce.data.data.timings)
            } catch {
                console.error("error can't get the data");
            } finally {
                setIsLoading(false)
            }
        }
        getTime()
    }, [city])

    // the diffirence between preyer

    // time now
    const countDown = () => {
        let t = dayjs()

        const checkRange = (start, end) => {
            return t.isBetween(dayjs(start, "HH:mm"), dayjs(end, "HH:mm"), null, '[)')
        }
        let index = 0;

        if (checkRange(timings["Fajr"], timings["Sunrise"])) {
            index = 1;
        } else if (checkRange(timings["Sunrise"], timings["Dhuhr"])) {
            index = 2;
        } else if (checkRange(timings["Dhuhr"], timings["Asr"])) {
            index = 3;
        } else if (checkRange(timings["Asr"], timings["Maghrib"])) {
            index = 4;
        }
        else if (checkRange(timings["Maghrib"], timings["Isha"])) {
            index = 5;
        }
        else {
            index = 0;
        }
        console.log(index)
        // console.log("Fajr Time:", dayjs(timings["Fajr"], "HH:mm").format());
        // console.log("is working ?", checkRange(timings["Sunrise"], timings["Dhuhr"]) )
        setNextPreyerIndex(index);

        // console.log(nextPreyerIndex)
        const nextPreyerObject = arrayPreyer[index];
        const nextPreyerTime = timings[nextPreyerObject.id];

        let remaining = dayjs(nextPreyerTime, "HH:mm").diff(t)
        // console.log(dayjs(nextPreyerTime, "HH:mm"))
        // console.log(t)
        // console.log(nextPreyerTime)
        // console.log(nextPreyerObject)
        let nextPreyerTimeMoment = dayjs(nextPreyerTime,"HH:mm")
        if (remaining < 0) {
            let midNight =dayjs("23:59:59","HH:mm").diff(t) ;
            let fajrTime = nextPreyerTimeMoment.diff(dayjs("00:00:00", "HH:mm:ss"));
          
             
            remaining = midNight + fajrTime;

        }
        // console.log(remaining)

        let durationTimeRemaining = dayjs.duration(remaining);
        
    //    console.log(durationTimeRemaining)
        setRemainingTime(
            `${durationTimeRemaining.hours()}:${durationTimeRemaining.minutes()}:${durationTimeRemaining.seconds() }`
)



    }
    useEffect(() => {
        let time = setInterval(() => {
            countDown()
            let t = dayjs()
            setDay(t.format("MMM D YYYY | HH:mm:ss "))
        }, 1000)
        return () => { clearInterval(time) }
    }, [timings])
    // ///////////////////////////////




    // choose the city to show preyer times
    const handelClick = (e) => {
        const cityApi = e.target.value;
        const city = e.target.options[e.target.selectedIndex].text;
        setCity({ displayName: city, apiName: cityApi })
    }
    return (
        <main className="flex flex-col items-center px-4 p-4 max-w-6xl mx-auto w-full gap-8">

            {/* 1. Hero / Countdown Section */}
            <section className="w-full bg-emerald-800 dark:bg-slate-800 text-white rounded-[2rem] p-4 md:p-4 shadow-2xl relative overflow-hidden">

                <div className="absolute top-[-50px] left-[-50px] w-38 h-38 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">

                    {/* Right side: Next Prayer Info */}
                    <div className="flex flex-col gap-2">
                        <span className="text-emerald-200 dark:text-slate-400 text-lg font-medium">الوقت المتبقي لصلاة {arrayPreyer[nextPreyerIndex].preyerName}</span>
                        {remainingTime}
                        <h2 className="text-2xl md:text-5xl font-bold font-mono tracking-wider" dir="rtl">
                            {city.displayName}
                        </h2>
                    </div>

                    {/* Left side: Date & City */}
                    <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                        <div className="text-xl md:text-2xl font-medium">{day}</div>

                        {/* City Selector */}
                        <select onClick={handelClick} className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none text-left">
                            <option className="text-black" value="Tlemcen">تلمسان</option>
                            <option className="text-black" value="Oran">وهران</option>
                            <option className="text-black" value="Algiers">الجزائر</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 2. Prayer Cards Grid */}
            <section dir="rtl" className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                <PreyerCard img={Fajr} title="الفجر" time={timings.Fajr} />
                <PreyerCard img={Fajr} title="الشروق" time={timings.Sunrise} />
                <PreyerCard img={Dhuhr} title="الظهر" time={timings.Dhuhr} />
                <PreyerCard img={Asr} title="العصر" time={timings.Asr} />
                <PreyerCard img={Maghrib} title="المغرب" time={timings.Maghrib} />
                <PreyerCard img={Isha} title="العشاء" time={timings.Isha} />

            </section>
        </main>
    );
}



