import React, {useState} from 'react';
import './Modal.css';

interface ModalProps {
    handleSubmit: () => void;
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children?: React.JSX.Element;
}

const Modal = ({handleSubmit, closeModal, isOpen, title, children}: ModalProps) => {


    return (
        <div className="modal-container">
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{title}</h2>
                        {children}
                        <button className="form-submit" onClick={() => {
                            handleSubmit()
                        }}>Submit</button>
                        <button className="close-button" onClick={() => {
                            closeModal()
                        }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
