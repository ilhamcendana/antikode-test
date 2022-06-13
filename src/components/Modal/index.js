/** Frameworks */
import { Fragment } from "react";
/** Icons */
import { ImCancelCircle } from 'react-icons/im';


const Modal = ({ isOpen, onClose, children }) => {
    return (
        <Fragment>
            <input type="checkbox" className="modal-toggle" checked={isOpen} />
            <div className="modal bg-transparent">
                <div onClick={onClose} className='bg-black opacity-50 absolute top-0 left-0 right-0 bottom-0 z-10' />
                <div className="bg-white relative rounded-lg p-8 max-w-4xl w-full z-20">
                    <ImCancelCircle size={25} className='absolute top-2 right-2 cursor-pointer' onClick={onClose} />
                    {children}
                </div>
            </div>
        </Fragment>
    );
}

export default Modal;