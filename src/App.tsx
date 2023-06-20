import React, {useEffect, useState} from 'react';
import './MyForm.css';
import Modal from "./modal/Modal";
import {createResident, deleteResidentById, getAllResidents, IResident, updateResidentById} from "./api";
import ResidentsTable from "./ResidentsTable/ResidentsTable";


const MyForm = () => {
    const [openForm, setOpenForm] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nameToUpdate, setNameToUpdate] = useState('');
    const [surnameToUpdate, setSurnameToUpdate] = useState('');
    const [residentToUpdate, setResidentToUpdate] = useState<IResident | null>(null);
    const [residentToDelete, setResidentToDelete] = useState<IResident | null>(null);
    const [isListUpdating, setIsListUpdating] = useState(false);

    const [residents, setResidents] = useState<IResident[]>([]);

    const fetchAllResidents = async () => {
        const residents = await getAllResidents() as IResident[];
        console.log(residents)
       if (residents?.length) {
           setResidents(residents)
       }
    }

    useEffect(() => {
        if (!isListUpdating) {
            fetchAllResidents()
        }
    }, [isListUpdating])

    const handleDeleteResidentToSubmit = async (id: string) => {
        setIsListUpdating(true)
        await deleteResidentById(id)
        setIsListUpdating(false)

    };
    const handleUpdateResidentToSubmit = async (id: string) => {
        setIsListUpdating(true)
        await updateResidentById(id, {name: nameToUpdate, surname: surnameToUpdate})
        setIsListUpdating(false)
    };

    const handleCreateResidentsSubmit = async (data: { name: string, surname: string }) => {
        setIsListUpdating(true)
        await createResident(data)
        setIsListUpdating(false)

    }

    return (
        <div>
            <div className="form-container">
                <button className="form-button" onClick={() => setOpenForm(true)}>Open Form</button>
                <button className="delete-button" >Delete Person</button>
                <div className="delete-input-container">
                    <input
                        className="delete-input"
                        type="text"
                        placeholder="Enter ID to delete"
                        value={deleteId}
                        onChange={(e) => setDeleteId(e.target.value)}
                    />
                </div>
                <Modal handleSubmit={() => {
                    handleCreateResidentsSubmit({name, surname})
                }} isOpen={openForm} closeModal={() => {
                    setOpenForm(false)
                }} title={'Create new resident'}>
                    <form className="input-form" onSubmit={(event) => {
                        event.preventDefault()
                    }}>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </form>
                </Modal>
                <Modal handleSubmit={() => {handleUpdateResidentToSubmit(residentToUpdate!.id)}} isOpen={!!residentToUpdate} closeModal={() => {
                    setResidentToUpdate(null)
                }} title={`Update ${residentToUpdate?.name}`}>
                    <form className="input-form" onSubmit={(event) => {
                        event.preventDefault()
                    }}>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Name"
                            value={nameToUpdate}
                            onChange={(e) => setNameToUpdate(e.target.value)}
                        />
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Surname"
                            value={surnameToUpdate}
                            onChange={(e) => setSurnameToUpdate(e.target.value)}
                        />
                    </form>
                </Modal>
                <Modal handleSubmit={() => {
                    handleDeleteResidentToSubmit(residentToDelete!.id)
                }} isOpen={!!residentToDelete} closeModal={() => {
                    setResidentToDelete(null)
                }} title={`Delete ${residentToDelete?.name}. Are you sure?`}/>


            </div>
            <ResidentsTable residents={residents} handleDelete={(resident) => {
                setResidentToDelete(resident)
            }} handleUpdate={(resident) => {
                setResidentToUpdate(resident)
            }}/>
        </div>
    );
};

export default MyForm;
