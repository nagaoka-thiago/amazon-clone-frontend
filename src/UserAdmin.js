import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Table, Spinner, Button, Modal } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const axios = require('axios')

function UserAdmin() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)

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

    useEffect(() => {
        if(loading) {
            axios.get('/users/')
                .then(function(response) {
                    setUsers([...response.data])
                    setLoading(false)
                })
        }
    }, [])
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
                                <td>{user.sex}</td>
                                <td>{user.address}</td>
                                <td>{user.nbr}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="outline-primary" onClick={() => setShowForm(true)}><EditIcon /></Button>
                                    <Button variant="outline-primary" onClick={() => alert(user.name)}><DeleteIcon /></Button>
                                </td>
                            </tr>
                            )
                    }
                    <tr>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>
                            <Button variant="outline-primary" onClick={() => setShowForm(true)}><AddIcon /></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={showForm}
                   onHide={ () => setShowForm(false) }
                   size="sm"
                   >
                <Modal.Header closeButton>
                    <Modal.Title>Hello world</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Hello world</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShowForm(false) }>Close</Button>
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