/** Frameworks */
import { Fragment } from "react";
/** Icons */
import { ImCancelCircle } from 'react-icons/im';
/** Libs */
import PropTypes from 'prop-types';


const Modal = ({ isOpen = false, onClose = () => null, children }) => {
    return (
        <Fragment>
            {/* this input for decide modal showed or not, reference to daisy UI https://daisyui.com/components/modal/ */}
            <input readOnly type="checkbox" className="modal-toggle" checked={isOpen} />
            <div className="modal bg-transparent">
                {/* OVERLAY */}
                <div onClick={onClose} className='bg-black opacity-50 absolute top-0 left-0 right-0 bottom-0 z-10' />
                {/* ============ END: OVERLAY */}
                {/* MODAL CONTENT CONTAINER */}
                <div className="bg-white relative rounded-lg p-8 max-w-4xl w-full z-20">
                    {/* CLOSE ICON */}
                    <ImCancelCircle size={25} className='absolute top-2 right-2 cursor-pointer' onClick={onClose} />
                    {/* ============ END: CLOSE ICON */}
                    {/* MODAL CONTENT */}
                    {children}
                    {/* ============ END: MODAL CONTENT */}
                </div>
                {/* ============ END: MODAL CONTENT CONTAINER */}
            </div>
        </Fragment>
    );
}

export default Modal;

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.any
}