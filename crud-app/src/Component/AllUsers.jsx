import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';

const StyledTableCell = styled(TableCell)`
    font-weight: 600;
    text-align: center;
    font-size: 15px
`;

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }

    return (
        <Table >
            <TableHead>
                <TableRow sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }} >
                    <StyledTableCell>Employee Id</StyledTableCell>
                    <StyledTableCell>Employee Name</StyledTableCell>
                    <StyledTableCell>Department/Team</StyledTableCell>
                    <StyledTableCell>Marital Status</StyledTableCell>
                    <StyledTableCell>Sex</StyledTableCell>
                    <StyledTableCell>Salary</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell >Actions</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell align='center'>{user.employeeId}</TableCell>
                        <TableCell align='center'>{user.employeeName}</TableCell>
                        <TableCell align='center'>{user.Department_Team}</TableCell>
                        <TableCell align='center'>{user.maritalStatus}</TableCell>
                        <TableCell align='center'>{user.sex}</TableCell>
                        <TableCell align='center'>{user.salary.length ? user.salary[0]?.salary : null}</TableCell>
                        <TableCell align='center' sx={{ wordWrap: 'break-word' }}>{user.address}</TableCell>
                        <TableCell>
                            <Stack direction={{ xs: 'column', md: 'row', }} justifyContent='center' spacing={3}>
                                <Button focusRipple color="info" variant="outlined" style={{ marginRight: 10 }} component={Link} to={`/add/${user.employeeId}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                                <Button color="error" variant="contained" onClick={() => deleteUserData(user.employeeId)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AllUsers;