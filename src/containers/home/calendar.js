import { useEffect } from "react";

const monthInManyDays = new Array((new Date().getMonth() + 1) % 2 ? 31 : 30).fill(undefined).map((_, i) => i + 1);
const month42Days = new Array(42).fill(undefined).map((_, i) => i + 1);
const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];

let limit = 6;
let multiply = 0;
const injectedMonth = monthsName[new Date().getMonth()];
const year = new Date().getFullYear();

{/* CALENDAR COMPONENT */ }
export default function Calendar({ date = [], dateSet, eventData = [], onClickDay }) {
    //func
    function syncDateToThisMonth() {
        let sample = [];
        multiply = 0;
        for (let day of monthInManyDays) {
            const initalizeTheDate = new Date(`${day} ${injectedMonth}, ${year}`);
            const getEvent = syncEventToDate(initalizeTheDate.getDate());
            sample.push({
                tanggal: initalizeTheDate.getDate(),
                bulan: injectedMonth,
                tahun: year,
                order: initalizeTheDate.getDay() + multiply,
                events: getEvent
            });
            if ((initalizeTheDate.getDay() + multiply) >= (limit + multiply)) {
                multiply += 7;
            }
        }
        dateSet(sample);
    }

    function syncEventToDate(tanggal) {
        const filtered = eventData.filter(i => i.tanggal === tanggal);
        return filtered;
    }

    function getContent(type, order) {
        const justOrder = date.filter(i => i.order === order);
        switch (type) {
            case 'GET_TANGGAL':
                return justOrder[0]?.tanggal;

            case 'GET_EVENT':
                return justOrder[0]?.events || [];
            default:
                break;
        }
    };

    //use effect
    useEffect(() => {
        syncDateToThisMonth();
    }, [eventData]);    

    return (
        <div className="w-full max-w-7xl mx-auto py-10">
            <p className="font-semibold text-4xl text-zinc-600 mb-14">
                Antikode Calendar Test
            </p>
            {/* WEEKS */}
            <div className="flex">
                {daysName.map((day, i) => (
                    <div key={i} className='flex-auto h-24 font-semibold text-lg'>
                        {day}
                    </div>
                ))}
            </div>
            {/* DAYS */}
            <div className="grid grid-cols-7 gap-6 overflow-auto h-[550px]">
                {month42Days.map((item) => (
                    <div
                        key={item}
                        onClick={() => onClickDay(getContent('GET_TANGGAL', item))}
                        className={`h-60 p-4 relative cursor-pointer border-t-4 border-t-zinc-600 transition-all hover:bg-zinc-700 group ${!getContent('GET_TANGGAL', item) && 'opacity-0 cursor-default'} active:scale-95 ${item > 35 && 'hidden'}`}>
                        <p className="font-semibold text-3xl group-hover:text-zinc-200">{getContent('GET_TANGGAL', item)}</p>
                        <div className="w-full absolute -top-1 h-1 bg-amber-500 left-0 opacity-0 group-hover:opacity-100" />

                        <div className="mt-4 flex flex-col gap-4 overflow-auto h-40">
                            {getContent('GET_EVENT', item).map((eventItem, eventIndex) => (
                                <div className="gap-1 flex flex-col" key={eventIndex}>
                                    <p className="font-semibold group-hover:text-zinc-300">{eventItem.title}</p>
                                    <p className="text-xs font-light text-zinc-500 group-hover:text-zinc-300">{eventItem.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}