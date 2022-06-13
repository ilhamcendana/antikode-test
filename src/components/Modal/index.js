/** Frameworks */
import { Fragment } from "react";


const Modal = ({ isOpen, onClose, children }) => {
    return (
        <Fragment>
            <input type="checkbox" className="modal-toggle" checked={isOpen} />
            <label className="modal bg-transparent">
                <div onClick={onClose} className='bg-black opacity-50 absolute top-0 left-0 right-0 bottom-0 z-10' />
                <div className="bg-white relative rounded-lg p-8 max-w-4xl w-full z-20">
                    {children}
                </div>
            </label>
        </Fragment>
    );
}

export default Modal;