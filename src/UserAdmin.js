import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import RegisterUser from './RegisterUser'
import { Table, Spinner, Button, Modal } from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const axios = require('axios')

function UserAdmin() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [userSelected, setUserSelected] = useState({})

    const cpfFormat = (number) => {
        const reg = /(?<fp>\d\d\d)(?<sp>\d\d\d)(?<td>\d\d\d)(?<fop>\d\d)/
        const ex = reg.exec(number)
        return ex.groups.fp + "." +
               ex.groups.sp + "." +
               ex.groups.td + "-" +
               ex.groups.fop
    }

    const birthdayFormat = (dbFormat) => {
        const reg = /(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d)/
        const ex = reg.exec(dbFormat)
        const {year, month, day} = ex.groups
        
        return day + "/" + month + "/" + year
    }
    
    const deleteUser = () => {
        axios.delete(`/users/delete/${userSelected.cpf}`)
            .then(function(response) {
                const deletedUser = response.data
                if(deletedUser !== null && deletedUser !== undefined)
                    setShowDeleteForm(false)
                    setLoading(true)
            })
    }

    useEffect(() => {
        if(loading) {
            axios.get('/users/')
                .then(function(response) {
                    setUsers([...response.data])
                    setLoading(false)
                })
        }
    }, [loading])
    return (
        <Container>
            <Title>
                <h1>User controlling section</h1>
            </Title>
            <Table size="sm" hover>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Sex</th>
                        <th>Street</th>
                        <th>Number</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>E-mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.cpf}>
                                <td>{cpfFormat(user.cpf)}</td>
                                <td>{user.name}</td>
                                <td>{birthdayFormat(user.birthday)}</td>
                                <td>{ user.sex === 'M' ? 'Male' : user.sex === 'F' ? 'Female' : 'Other' }</td>
                                <td>{user.address}</td>
                                <td>{user.nbr}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="outline-primary" onClick={ () => { setUserSelected(user); setShowForm(true)} } className="mr-2"><EditIcon /></Button>
                                    <Button variant="outline-primary" onClick={ () => { setUserSelected(user); setShowDeleteForm(true)} }><DeleteIcon /></Button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </Table>
            <Modal show={showForm}
                   onHide={ () => setShowForm(false) }
                   size="lg"
                   backdrop="static"
                   keyboard={false}
                   >
                <Modal.Header closeButton>
                    <Modal.Title>User '{ userSelected.name }' edition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterUser user={userSelected} isEdit={true} setShowForm={ setShowForm } setLoadingAdmin={ setLoading } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShowForm(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteForm}
                   onHide={ () => setShowDeleteForm(false) }
                   size="lg"
                   backdrop="static"
                   keyboard={false}
                   >
                <Modal.Header>
                    <Modal.Title>Deleting user {userSelected.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Are you sure you want to delete {userSelected.name}'s profile?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                            onClick={ () => setShowDeleteForm(false) }>No</Button>
                    <Button variant="outline-primary"
                            onClick={ deleteUser }>Yes</Button>
                </Modal.Footer>
            </Modal>
            {
                loading ? (
                            <LoadingContainer>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </LoadingContainer>
                          ) : null
            }
        </Container>

    )
}

export default UserAdmin

const Container = styled.div`
    background-color: white;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`