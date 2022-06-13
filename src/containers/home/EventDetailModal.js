import Modal from "@components/Modal";
import { useEffect, useState } from "react";
import { validateEmail } from '@utils/utils';

export default function EventDetailModal({ isOpen = false, onClose, modalSelectedDataIndex, data = [], onSubmit }) {
    // local state
    const [isCreateMode, isCreateModeSet] = useState(false);
    const [titleInput, titleInputSet] = useState('');
    const [listInvitees, listInviteesSet] = useState([]);
    const [inviteesInput, inviteesInputSet] = useState('');
    const [timeFromInput, timeFromInputSet] = useState(8);
    const [timeFromInputAMPM, timeFromInputAMPMSet] = useState('AM');
    const [timeToInput, timeToInputSet] = useState(11);
    const [timeToInputAMPM, timeToInputAMPMSet] = useState('AM');

    //func 
    function disableHandler() {
        if (data && data.length >= 3) return true;
        return false;
    }
    function submitDisabledHandler() {
        if (!titleInput) return true;
        return false;
    }
    function onSubmitHandler() {
        onSubmit(titleInput, listInvitees, timeFromInput, timeFromInputAMPM, timeToInput, timeToInputAMPM);
        resetValue();
        isCreateModeSet(false);
    }
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
            resetValue();
        }
    }, [isOpen])
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {<div>
                <p className="text-4xl font-semibold text-zinc-600">{modalSelectedDataIndex} June, 2022</p>
                <div className="mt-8 gap-2">
                    {!isCreateMode &&
                        <div className="flex flex-col gap-4 items-start">
                            <p className="text-lg font-semibold border-b-2 border-b-zinc-600">Events</p>

                            <div className="flex gap-12 items-start w-full">
                                {data ?
                                    data.map((eventItem, eventIndex) => (
                                        <div className="gap-1 flex flex-col" key={eventIndex}>
                                            <p className="font-semibold group-hover:text-zinc-300">{eventItem.title}</p>
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

                    {isCreateMode &&
                        <div className="flex flex-col gap-4 w-full">
                            <p className="text-lg font-semibold mb-2 border-b-2 border-b-zinc-600">Create an event</p>

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
                                                {new Array(12).fill(undefined).map((_, i) => <option value={i}>{i}</option>)}
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
                                                {new Array(12).fill(undefined).map((_, i) => <option disabled={timeFromInput >= i} value={i}>{i}</option>)}
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
                                <button onClick={onSubmitHandler} disabled={submitDisabledHandler()} className="btn">Create</button>
                                <button onClick={() => isCreateModeSet(false)} className="btn btn-error">Cancel</button>
                            </div>
                        </div>
                    }
                </div>
            </div>}
        </Modal>
    )
}