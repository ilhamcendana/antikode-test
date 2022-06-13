/** Frameworks */
import { useEffect, useState } from "react";
/** Components */
import Modal from "@components/Modal";
/** Icons */
import { RiEditLine } from 'react-icons/ri';
/** Libs */
import { v4 as uid } from 'uuid';
import PropTypes from 'prop-types';
/** Utils */
import { validateEmail } from '@utils/utils';
import { colorsEvents } from "@utils/constants";

/** COMPONENTS */
export default function EventDetailModal({ isOpen = false, onClose, modalSelectedDataIndex, data = [], onSubmit, onDelete }) {
    // local state
    const [isCreateMode, isCreateModeSet] = useState(false); // true if its create new event mode
    const [isEditMode, isEditModeSet] = useState(false); // true if its edit event mode
    const [titleInput, titleInputSet] = useState(''); // input of title
    const [listInvitees, listInviteesSet] = useState([]); // list of invitees
    const [inviteesInput, inviteesInputSet] = useState(''); // input invitees before pushed to array 
    const [timeFromInput, timeFromInputSet] = useState(8); // input time from
    const [timeFromInputAMPM, timeFromInputAMPMSet] = useState('AM'); // input time from am/pm
    const [timeToInput, timeToInputSet] = useState(11); // input time to
    const [timeToInputAMPM, timeToInputAMPMSet] = useState('AM'); // input time to am/pm
    const [selectedDataForEdits, selectedDataForEditsSet] = useState({}); // selected edit

    //func 
    // disabled handler for create new event button
    function disableHandler() {
        if (data && data.length >= 3) return true; // max 3 events
        return false;
    }
    // disabled handler for submit button
    function submitDisabledHandler() {
        if (!titleInput) return true; // just title input is required
        return false;
    }
    // handling submitting new event or editing event
    function onSubmitHandler() {
        onSubmit(titleInput, listInvitees, timeFromInput, timeFromInputAMPM, timeToInput, timeToInputAMPM, isEditMode ? selectedDataForEdits.id : uid(), isEditMode);
        resetValue();
        isCreateModeSet(false);
        isEditModeSet(false);
    }
    // reset the value to init
    function resetValue() {
        titleInputSet('');
        listInviteesSet([]);
        inviteesInputSet('');
        timeFromInputSet(8);
        timeFromInputAMPMSet('AM');
        timeToInputSet(11);
        timeToInputAMPMSet('AM');
    }

    //useeffect
    useEffect(() => {
        if (!isOpen) {
            isCreateModeSet(false);
            isEditModeSet(false);
            resetValue();
        }
    }, [isOpen])
    // useeffect for handling am pm when its edit mode and need to assign to their state
    useEffect(() => {
        if (isEditMode) {
            titleInputSet(selectedDataForEdits.title);
            listInviteesSet(selectedDataForEdits.invitees);
            const splitByDash = selectedDataForEdits.time.split("-");
            if (splitByDash[0].includes("AM")) {
                const splittedFrom = splitByDash[0].split("AM");
                timeFromInputSet(parseInt(splittedFrom[0]))
                timeFromInputAMPMSet("AM");
            } else {
                const splittedFrom = splitByDash[0].split("PM");
                timeFromInputSet(parseInt(splittedFrom[0]))
                timeFromInputAMPMSet("PM");
            }
            if (splitByDash[1].includes("AM")) {
                const splittedTo = splitByDash[1].split("AM");
                timeToInputSet(parseInt(splittedTo[0]));
                timeToInputAMPMSet('AM');
            } else {
                const splittedTo = splitByDash[1].split("PM");
                timeToInputSet(parseInt(splittedTo[0]));
                timeToInputAMPMSet('PM');
            }
        }
    }, [isEditMode])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                {/* TANGGAL */}
                <p className="text-4xl font-semibold text-zinc-600">{modalSelectedDataIndex} June, 2022</p>
                {/* ========= END: TANGGAL */}
                <div className="mt-8 gap-2">
                    {/* EVENT DETAIL LIST */}
                    {!isCreateMode && !isEditMode &&
                        <div className="flex flex-col gap-6 items-start">
                            <p className="text-lg font-semibold border-b-2 border-b-zinc-600">Events</p>

                            <div className="flex gap-12 items-start w-full">
                                {data ?
                                    data.map((eventItem, eventIndex) => (
                                        <div className="gap-1 flex flex-col relative" key={eventIndex}>
                                            <RiEditLine size={20}
                                                className='absolute -top-5 -right-6 cursor-pointer hover:text-zinc-500'
                                                onClick={() => {
                                                    isEditModeSet(true);
                                                    selectedDataForEditsSet(eventItem);
                                                }} />
                                            <p className={`font-semibold group-hover:text-zinc-300 ${colorsEvents[eventIndex]}`}>{eventItem.title}</p>
                                            <p className="text-xs font-light text-zinc-500 group-hover:text-zinc-300">{eventItem.time}</p>
                                            <div className="flex gap-2">
                                                {eventItem.invitees.map((email) => (
                                                    <p key={email} className="bg-zinc-600 text-zinc-200 py-1 px-2 rounded-md text-xs overflow-hidden text-ellipsis group-hover:bg-zinc-200 group-hover:text-zinc-700">
                                                        {email}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <p>No event yet</p>
                                }
                            </div>
                            <button disabled={disableHandler()} onClick={() => isCreateModeSet(true)} className="btn">Create an event</button>
                        </div>
                    }
                    {/* ========= END: EVENT DETAIL LIST */}
                    {/* DATA INPUT CREATE OR EDIT EVENT */}
                    {(isCreateMode || isEditMode) &&
                        <div className="flex flex-col gap-4 w-full">
                            <p className="text-lg font-semibold mb-2 border-b-2 border-b-zinc-600">{isEditMode ? 'Edit' : 'Create'} an event</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="form-control w-full col-span-1">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input value={titleInput} onChange={e => titleInputSet(e.target.value)} type="text" className="input input-bordered w-full" />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="form-control w-full col-span-1">
                                        <label className="label">
                                            <span className="label-text">From</span>
                                        </label>
                                        <div className="flex gap-2 flex-auto">
                                            <select value={timeFromInput}
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    const parsedVal = val && parseInt(val);
                                                    timeFromInputSet(parsedVal);
                                                    timeToInputSet(prev => (parsedVal >= prev) ? parsedVal + 1 : prev);
                                                }}
                                                className="select select-bordered flex-auto">
                                                {new Array(12).fill(undefined).map((_, i) => <option key={i} value={i}>{i}</option>)}
                                            </select>
                                            <select value={timeFromInputAMPM}
                                                onChange={e => {
                                                    timeFromInputAMPMSet(e.target.value);
                                                    timeToInputAMPMSet(prev => prev === 'AM' ? 'PM' : prev)
                                                }}
                                                className="select select-bordered flex-auto">
                                                <option value={'AM'}>AM</option>
                                                <option value={'PM'}>PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-control w-full col-span-1">
                                        <label className="label">
                                            <span className="label-text">To</span>
                                        </label>
                                        <div className="flex gap-2 flex-auto">
                                            <select value={timeToInput}
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    const parsedVal = val && parseInt(val);
                                                    timeToInputSet(parsedVal);
                                                }}
                                                className="select select-bordered flex-auto">
                                                {new Array(12).fill(undefined).map((_, i) => <option key={i} disabled={timeFromInput >= i} value={i}>{i}</option>)}
                                            </select>
                                            <select value={timeToInputAMPM}
                                                onChange={e => timeToInputAMPMSet(e.target.value)}
                                                className="select select-bordered flex-auto">
                                                <option disabled={timeFromInputAMPM === 'PM'} value={'AM'}>AM</option>
                                                <option value={'PM'}>PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control w-full col-span-2">
                                    <label className="label">
                                        <span className="label-text">Invitees</span>
                                    </label>
                                    <div className="flex gap-4 items-center flex-wrap">
                                        {listInvitees.map((email) =>
                                            <p key={email} className="bg-zinc-600 text-zinc-200 relative py-1 px-2 rounded-md text-xs group-hover:bg-zinc-200 group-hover:text-zinc-700">
                                                {email}
                                                <span
                                                    onClick={() => {
                                                        listInviteesSet(prev => {
                                                            let sample = [...prev];
                                                            const filtered = sample.filter(i => i !== email);
                                                            sample = filtered
                                                            return sample;
                                                        })
                                                    }}
                                                    className="bg-red-400 w-4 h-4 cursor-pointer flex items-center justify-center absolute z-10 -top-2 -right-2 text-white rounded-full">x</span>
                                            </p>)}
                                        <input disabled={listInvitees.length >= 5} value={inviteesInput} onChange={e => inviteesInputSet(e.target.value)} type="text" className="input input-bordered" />
                                        <button
                                            disabled={listInvitees.length >= 5 || listInvitees.includes(inviteesInput) || !validateEmail(inviteesInput)}
                                            onClick={() => {
                                                if (inviteesInput) {
                                                    listInviteesSet(prev => {
                                                        let sample = [...prev];
                                                        sample.push(inviteesInput)
                                                        return sample;
                                                    })
                                                    inviteesInputSet('');
                                                }
                                            }}
                                            className="btn btn-info">{listInvitees.includes(inviteesInput) ? 'Email is already exist' : 'Add'}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={onSubmitHandler} disabled={submitDisabledHandler()} className="btn">{isEditMode ? 'Edit' : 'Create'}</button>
                                {isEditMode && <button onClick={() => {
                                    onDelete(selectedDataForEdits.id);
                                    isEditModeSet(false);
                                }} className="btn btn-error">Delete</button>}
                                <button onClick={() => {
                                    isCreateModeSet(false);
                                    isEditModeSet(false);
                                    resetValue();
                                }} className="btn btn-error">Cancel</button>
                            </div>
                        </div>
                    }
                    {/* ========= END: DATA INPUT FOR CREATE OR EDIT EVENT */}
                </div>
            </div>
        </Modal>
    )
}

EventDetailModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    modalSelectedDataIndex: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        invitees: PropTypes.arrayOf(PropTypes.string),
        tanggal: PropTypes.number,
        time: PropTypes.string,
        title: PropTypes.string
    })),
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func
}