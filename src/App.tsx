import React, {useEffect, useState} from 'react';
import './MyForm.css';
import Modal from './modal/Modal';
import {
    createResident,
    deleteResidentById,
    getAllResidents,
    IResident,
    updateResidentById,
} from './api';
import ResidentsTable from './ResidentsTable/ResidentsTable';
import {
    Button,
    TextField,
    Typography,
    Container,
    Grid,
} from '@mui/material';

const MyForm = () => {
    const [openForm, setOpenForm] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nameToUpdate, setNameToUpdate] = useState('');
    const [surnameToUpdate, setSurnameToUpdate] = useState('');
    const [residentToUpdate, setResidentToUpdate] = useState<IResident | null>(
        null
    );
    const [residentToDelete, setResidentToDelete] = useState<IResident | null>(
        null
    );
    const [isListUpdating, setIsListUpdating] = useState(false);

    const [residents, setResidents] = useState<IResident[]>([]);

    const fetchAllResidents = async () => {
        const residents = (await getAllResidents()) as IResident[];
        console.log(residents);
        if (residents?.length) {
            setResidents(residents);
        }
    };

    useEffect(() => {
        if (!isListUpdating) {
            fetchAllResidents();
        }
    }, [isListUpdating]);

    const handleDeleteResidentToSubmit = async (id: string) => {
        setIsListUpdating(true);
        await deleteResidentById(id);
        setIsListUpdating(false);
    };

    const handleUpdateResidentToSubmit = async (id: string) => {
        setIsListUpdating(true);
        await updateResidentById(id, {name: nameToUpdate, surname: surnameToUpdate});
        setIsListUpdating(false);
    };

    const handleCreateResidentsSubmit = async (data: { name: string; surname: string }) => {
        setIsListUpdating(true);
        await createResident(data);
        setIsListUpdating(false);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={() => setOpenForm(true)}>
                        Add resident
                    </Button>
                    <Modal
                        handleSubmit={() => {
                            handleCreateResidentsSubmit({name, surname});
                        }}
                        isOpen={openForm}
                        closeModal={() => {
                            setOpenForm(false);
                        }}
                        title={'Create new resident'}
                    >
                        <form
                            className="input-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}
                        >
                            <TextField
                                className="form-input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                className="form-input"
                                type="text"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                fullWidth
                            />
                        </form>
                    </Modal>
                    <Modal
                        handleSubmit={() => {
                            handleUpdateResidentToSubmit(residentToUpdate!.id);
                        }}
                        isOpen={!!residentToUpdate}
                        closeModal={() => {
                            setResidentToUpdate(null);
                        }}
                        title={`Update ${residentToUpdate?.name}`}
                    >
                        <form
                            className="input-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}
                        >
                            <TextField
                                className="form-input"
                                type="text"
                                placeholder="Name"
                                value={nameToUpdate}
                                onChange={(e) => setNameToUpdate(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                className="form-input"
                                type="text"
                                placeholder="Surname"
                                value={surnameToUpdate}
                                onChange={(e) => setSurnameToUpdate(e.target.value)}
                                fullWidth
                            />
                        </form>
                    </Modal>
                    <Modal
                        handleSubmit={() => {
                            handleDeleteResidentToSubmit(residentToDelete!.id);
                        }}
                        isOpen={!!residentToDelete}
                        closeModal={() => {
                            setResidentToDelete(null);
                        }}
                        title={`Delete ${residentToDelete?.name}. Are you sure?`}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ResidentsTable
                        residents={residents}
                        handleDelete={(resident) => {
                            setResidentToDelete(resident);
                        }}
                        handleUpdate={(resident) => {
                            setResidentToUpdate(resident);
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyForm;
