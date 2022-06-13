/** Frameworks */
import Head from "next/head";
import { useState } from "react";
/** Containers */
import Calendar from "@containers/home/calendar";
import EventDetailModal from "@containers/home/EventDetailModal";

export default function Home() {
    // local state
    const [date, dateSet] = useState([]);
    const [eventData, eventDataSet] = useState([
        {
            tanggal: 21,
            title: 'Getting hired from Antikode',
            time: '9AM - 18PM',
            invitees: ['ilhamcendana.p@gmail.com']
        },
        {
            tanggal: 10,
            title: 'Event 1',
            time: '9AM - 18PM',
            invitees: ['ilhamcendana.p@gmail.com']
        },
        {
            tanggal: 10,
            title: 'Event 2',
            time: '9AM - 18PM',
            invitees: ['ilhamcendana.p@gmail.com']
        },
        {
            tanggal: 10,
            title: 'Event 3',
            time: '9AM - 18PM',
            invitees: ['ilhamcendana.p@gmail.com']
        }
    ]);
    const [isModalOpen, isModalOpenSet] = useState(false);
    const [modalSelectedDataIndex, modalSelectedDataIndexSet] = useState(null);

    //func
    function getEventBasedOnOrder() {
        const filtered = eventData.filter(i => i.tanggal === modalSelectedDataIndex);
        return filtered.length !== 0 ? filtered : null;
    }

    function SET_NEW_EVENT(titleEvent, listInvitees, timeFrom, timeFromAMPM, timeTo, timeToAMPM) {
        eventDataSet(prev => {
            let sample = [...prev];
            sample.push({
                tanggal: modalSelectedDataIndex,
                title: titleEvent,
                invitees: listInvitees,
                time: `${timeFrom}${timeFromAMPM} - ${timeTo}${timeToAMPM}`,
            });
            return sample;
        });
        localStorage.setItem('eventData', JSON.stringify(eventData));
    }

    // logs
    console.log(date);
    console.log(getEventBasedOnOrder());

    return (
        <div>
            <Head>
                <title>Antikode Test</title>
            </Head>

            <main className="container mx-auto">
                <Calendar
                    date={date}
                    dateSet={dateSet}
                    eventData={eventData}
                    onClickDay={tanggal => {
                        isModalOpenSet(true);
                        modalSelectedDataIndexSet(tanggal);
                    }}
                    focusOnDate={modalSelectedDataIndex}
                />
                <EventDetailModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        isModalOpenSet(false);
                        modalSelectedDataIndexSet(null);
                    }}
                    modalSelectedDataIndex={modalSelectedDataIndex}
                    data={getEventBasedOnOrder()}
                    onSubmit={SET_NEW_EVENT}
                />
            </main>
        </div>
    )
}