/** Frameworks */
import Head from "next/head";
import { useEffect, useState } from "react";
/** Containers */
import Calendar from "@containers/home/calendar";
import EventDetailModal from "@containers/home/EventDetailModal";
/** Libs */
import { v4 as uid } from 'uuid';

export default function Home() {
    // local state
    const [date, dateSet] = useState([]); // where the actual date set up
    const [eventData, eventDataSet] = useState([]); // just the event data, it will be processed to the date state
    const [isModalOpen, isModalOpenSet] = useState(false); // modal for detail event
    const [modalSelectedDataIndex, modalSelectedDataIndexSet] = useState(null); // selected detail modal when its opens up

    //func
    // return an event data based on its order
    function getEventBasedOnOrder() {
        const filtered = eventData.filter(i => i.tanggal === modalSelectedDataIndex); // matching the tanggal
        return filtered.length !== 0 ? filtered : null; // if the filter is empty array then return null
    }
    // save and edit new event
    function SET_NEW_EVENT(titleEvent, listInvitees, timeFrom, timeFromAMPM, timeTo, timeToAMPM, id, isEdit) {
        // check if this is a save event
        if (!isEdit) {
            eventDataSet(prev => {
                let sample = [...prev];
                sample.push({
                    tanggal: modalSelectedDataIndex,
                    title: titleEvent,
                    invitees: listInvitees,
                    time: `${timeFrom}${timeFromAMPM} - ${timeTo}${timeToAMPM}`,
                    id: id
                });
                // save the data to localstorage
                localStorage.setItem('eventData', JSON.stringify(sample));
                return sample;
            });
        } else { // this is for the edit event
            eventDataSet(prev => {
                let sample = [...prev];
                const getIndex = sample.findIndex(i => i.id === id);
                sample[getIndex].title = titleEvent;
                sample[getIndex].invitees = listInvitees;
                sample[getIndex].time = `${timeFrom}${timeFromAMPM} - ${timeTo}${timeToAMPM}`;
                localStorage.setItem('eventData', JSON.stringify(sample));
                return sample;
            });
        }
    }
    // get event that saved from localstorage
    function getEventDataFromStorage() {
        // get from localstorage
        const getLSData = localStorage.getItem('eventData');
        if (getLSData) { // check if data is not null or undefined
            eventDataSet(JSON.parse(getLSData)); // set the state from localstorage that already parsed
        } else {
            // this is just for the initialize first data
            eventDataSet([{
                tanggal: 21,
                title: 'Getting hired from Antikode',
                time: '9AM - 6PM',
                invitees: ['ilhamcendana.p@gmail.com'],
                id: uid()
            }])
        }
    }
    // deleting event
    function onDeleteHandler(id) {
        eventDataSet(prev => {
            let sample = [...prev];
            const filtered = sample.filter(i => i.id !== id); // filter if id from each eventData is not match from the id want to be deleted
            localStorage.setItem('eventData', JSON.stringify(filtered)); // set new data to localstorage
            return filtered;
        });
    }

    //useeffect
    useEffect(() => {
        getEventDataFromStorage(); // first function to run to retrieve the data from localstorage
    }, []);

    // logs
    // console.log(date);

    return (
        <div>
            <Head>
                <title>Antikode Test</title>
            </Head>

            <main className="container mx-auto">
                {/* CALENDAR CONTAINERS */}
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
                {/* ============== END: CALENDAR CONTAINERS */}
                {/* MODAL DETAIL EVENT */}
                <EventDetailModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        isModalOpenSet(false);
                        modalSelectedDataIndexSet(null);
                    }}
                    modalSelectedDataIndex={modalSelectedDataIndex}
                    data={getEventBasedOnOrder()}
                    onSubmit={SET_NEW_EVENT}
                    onDelete={onDeleteHandler}
                />
                {/* ============== END: MODAL DETAIL EVENT */}
            </main>
        </div>
    )
}