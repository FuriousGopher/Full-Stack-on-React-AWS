import React, {useState} from 'react';
import './ResidentsTable.css';
import {IResident} from "../api";

interface TableProps {
    residents: IResident[];
    handleUpdate: (resident: IResident) => void;
    handleDelete: (resident: IResident) => void;
}

const ResidentsTable = ({residents, handleUpdate, handleDelete}: TableProps) => {

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {residents.map((person) => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.surname}</td>
                        <td>{person.createdAt}</td>
                        <td>
                            <button onClick={() => handleUpdate(person)}>Update</button>
                            <button onClick={() => handleDelete(person)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResidentsTable;
