import React, { useState, ReactElement, ReactNode } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import './Modal.css';

interface CustomModalProps {
    handleSubmit: () => void;
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children?: ReactNode;
}

const CustomModal = ({
                         handleSubmit,
                         closeModal,
                         isOpen,
                         title,
                         children,
                     }: CustomModalProps) => {
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
        <Modal open={isOpen} onClose={handleModalClose}>
            <Box className="modal-container">
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
                <form className="input-form" onSubmit={handleFormSubmit}>
                    {renderChildren()}
                    <div className="button-container">
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                        <Button className="close-button" onClick={handleModalClose}>
                            Close
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default CustomModal;
