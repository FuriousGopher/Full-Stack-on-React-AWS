import React from 'react';
import './ResidentsTable.css';
import { IResident } from '../api';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Update} from "@mui/icons-material";

interface TableProps {
    residents: IResident[];
    handleUpdate: (resident: IResident) => void;
    handleDelete: (resident: IResident) => void;
}

const ResidentsTable = ({
                            residents,
                            handleUpdate,
                            handleDelete,
                        }: TableProps) => {
    return (
        <TableContainer component="div" className="table-container">
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Surname
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Created At
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {residents.map((person) => (
                        <TableRow key={person.id}>
                            <TableCell>{person.name}</TableCell>
                            <TableCell>{person.surname}</TableCell>
                            <TableCell>{person.createdAt}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<Update />}
                                    onClick={() => handleUpdate(person)}
                                    sx={{ ml: 2 }}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="info"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(person)}
                                    className="custom-button"
                                    sx={{ ml: 2 }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ResidentsTable;
