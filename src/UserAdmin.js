import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const axios = require('axios')

function UserAdmin() {
    const [users, setUsers] = useState([])

    const cpfFormat = (number) => {
        const reg = /(?<n11>\d)(?<n10>\d)(?<n9>\d)(?<n8>\d)(?<n7>\d)(?<n6>\d)(?<n5>\d)(?<n4>\d)(?<n3>\d)(?<n2>\d)(?<n1>\d)/
        const ex = reg.exec(number)
        return ex.groups.n11 + ex.groups.n10 + ex.groups.n9 + "." +
               ex.groups.n8 + ex.groups.n7 + ex.groups.n6 + "." +
               ex.groups.n5 + ex.groups.n4 + ex.groups.n3 + "-" +
               ex.groups.n2 + ex.groups.n1
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

const TableContent = styled.div`
    margin: 20px 10px;
    padding: 5px;
    background-color: rgb(185, 185, 185);
`

const Line = styled.div`
    display: flex;
    margin: 10px 5px;
    :hover {
        background-color: rgb(149, 149, 149);
    }
`

const LineHeader = styled.div`
    display: flex;
    font-size: 25px;
    font-weight: 600;
    margin: 10px 5px;
    justify-content: center;
    flex: 1;
`

const LineDisplay = styled.div`
    display: flex;
    font-size: 12px;
    margin: 10px 5px;
    justify-content: center;
    flex: 1;
`