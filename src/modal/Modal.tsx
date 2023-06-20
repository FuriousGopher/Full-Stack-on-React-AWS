import React, { useState, ReactElement, ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
    handleSubmit: () => void;
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children?: ReactNode;
}

const Modal = ({ handleSubmit, closeModal, isOpen, title, children }: ModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleModalSubmit = () => {
        setIsSubmitting(true);
        handleSubmit();
        setIsSubmitting(false);
        closeModal();
    };

    const handleModalClose = () => {
        if (!isSubmitting) {
            closeModal();
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleModalSubmit();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    const renderChildren = (): ReactNode => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child as ReactElement<any>, {
                    onChange: handleInputChange,
                    value: '',
                });
            }
            return child;
        });
    };

    return (
        <div className="modal-container">
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{title}</h2>
                        <form className="input-form" onSubmit={handleFormSubmit}>
                            {renderChildren()}
                            <button className="form-submit" type="submit">
                                Submit
                            </button>
                        </form>
                        <button className="close-button" onClick={handleModalClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
