import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const axios = require('axios')

function UserAdmin() {
    const [users, setUsers] = useState([])

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
        axios.get('/users/')
            .then(function(response) {
                setUsers([...response.data])
            })
    }, [])
    return (
        <Container>
            <Title>
                <h1>User controlling section</h1>
            </Title>
            <TableContent>
                <Line>
                    <LineHeader>CPF</LineHeader>
                    <LineHeader>Name</LineHeader>
                    <LineHeader>Birthday</LineHeader>
                    <LineHeader>Sex</LineHeader>
                    <LineHeader>Street</LineHeader>
                    <LineHeader>Number</LineHeader>
                    <LineHeader>City</LineHeader>
                    <LineHeader>State</LineHeader>
                    <LineHeader>Country</LineHeader>
                    <LineHeader>E-mail</LineHeader>
                    <LineHeader>Action</LineHeader>
                </Line>
                {
                    users.map(user =>
                        <Line key={user.cpf}>
                            <LineDisplay>{cpfFormat(user.cpf)}</LineDisplay>
                            <LineDisplay>{user.name}</LineDisplay>
                            <LineDisplay>{birthdayFormat(user.birthday)}</LineDisplay>
                            <LineDisplay>{user.sex}</LineDisplay>
                            <LineDisplay>{user.address}</LineDisplay>
                            <LineDisplay>{user.nbr}</LineDisplay>
                            <LineDisplay>{user.city}</LineDisplay>
                            <LineDisplay>{user.state}</LineDisplay>
                            <LineDisplay>{user.country}</LineDisplay>
                            <LineDisplay>{user.email}</LineDisplay>
                            <LineDisplay>My actions</LineDisplay>
                        </Line>
                        )
                }
            </TableContent>
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

const TableContent = styled.table`
    width: 100%;
    padding: 20px 10px;
    background-color: rgb(185, 185, 185);
`

const Line = styled.tr`
    :has(> td) {
        background-color: rgb(149, 149, 149);
    }
`

const LineHeader = styled.th`
    font-size: 25px;
    text-align: left;
    border: 1px solid black;
    flex: 1;
`

const LineDisplay = styled.td`
    font-size: 12px;
    text-align: left;
    border: 1px solid black;
    flex: 1;
`