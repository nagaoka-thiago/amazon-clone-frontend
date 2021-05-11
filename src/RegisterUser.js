import React, { useState } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'

const axios = require('axios')

function RegisterUser() {
    const history = useHistory()
    const [cpf, setCpf] = useState('')
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [sex, setSex] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')

    const changeDateFormat = (e) => {
        const reg = /(?<day>\d\d)\/(?<month>\d\d)\/(?<year>\d\d\d\d)/ //catches the day, month and the year of the text
        const ex = reg.exec(e.formattedValue)
        return ex && ex.groups.year + "-" + ex.groups.month + "-" + ex.groups.day
    }

    const addUser = () => {
        if(cpf === null) alert('Type your CPF!')
        else if(name === null) alert('Type your name!')
        else if(birthday === null) alert('Type your birthday!')
        else if(sex === " ") alert('Select your gender!')
        else if(address === null) alert('Type your address!')
        else if(number === null) alert('Type your address number!')
        else if(city === null) alert('Type your city!')
        else if(state === null) alert('Type your state!')
        else if(country === null) alert('Type your country!')
        else if(email === null) alert('Type your e-mail!')
        else if(password === null) alert('Type a password!')
        else if(confPass === null) alert('Confirm your password!')
        else if(password !== confPass) alert('Typed password does not match with your confirmed password!')
        else {
            axios.post('/users/add/', {
                cpf,
                name,
                birthday,
                sex,
                address,
                number,
                city,
                state,
                country,
                email,
                password
            }).then(function(response) {
                const newUser = response.data
                if(newUser !== null && newUser !== undefined) {
                    alert(`User ${name} registered successfully!`)
                    history.goBack()
                }
                else alert(`User ${name} could not be registered, verify if you have already registered with this CPF: ${cpf}`)
            }).catch(function(error) {
                alert(`User ${name} could not be registered, verify if you have already registered with this CPF: ${cpf}`)
            })
        }
    }

    return (
        <Container>
            <Title>Registering user</Title>
            <FormContainer>
                <FormField>
                    <FormLabel>Your complete name</FormLabel>
                    <FormTextField type="text" onChange={ (e) => setName(e.target.value) } placeholder="Place your complete name" />
                </FormField>
                <FormField>
                    <FormField>
                        <FormLabel>CPF</FormLabel>
                        <NumberFormat format="###.###.###-##" mask="_" onValueChange={ (e) => setCpf(e.value) } placeholder="Place your CPF" />
                    </FormField>
                    <FormField>
                        <FormLabel>Birthday</FormLabel>
                        <NumberFormat format="##/##/####" mask="_" onValueChange={ (e) => setBirthday(changeDateFormat(e)) } placeholder="Place your Birthday" />
                    </FormField>
                    <FormField>
                        <FormLabel>Sex</FormLabel>
                        <FormSelect onChange={ (e) => setSex(e.target.value) }>
                            <option value=" ">Select your gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Others</option>
                        </FormSelect>
                    </FormField>
                </FormField>
                <FormField>
                    <FormLabel>Address</FormLabel>
                    <FormTextField type="text" onChange={ (e) => setAddress(e.target.value) } placeholder="Place your address street" />
                    <NumberFormat onValueChange={ (e) => setNumber(e.value) } placeholder="Place your address number" />
                </FormField>
                <FormField>
                    <FormField>
                        <FormLabel>City</FormLabel>
                        <FormTextField type="text" onChange={ (e) => setCity(e.target.value) } placeholder="Place your city" />
                    </FormField>
                    <FormField>
                        <FormLabel>State</FormLabel>
                        <FormTextField type="text" onChange={ (e) => setState(e.target.value) } placeholder="Place your state" />
                    </FormField>
                    <FormField>
                        <FormLabel>Country</FormLabel>
                        <FormTextField type="text" onChange={ (e) => setCountry(e.target.value) } placeholder="Place your country" />
                    </FormField>
                </FormField>
                <FormField>
                    <FormLabel>E-mail</FormLabel>
                    <FormTextField type="email" onChange={ (e) => setEmail(e.target.value) } placeholder="Place your e-mail" />
                </FormField>
                <FormField>
                    <FormField>
                        <FormLabel>Password</FormLabel>
                        <FormTextField type="password" onChange={ (e) => setPassword(e.target.value) } placeholder="Place your password" />
                    </FormField>
                    <FormField>
                        <FormLabel>Confirm password</FormLabel>
                        <FormTextField type="password" onChange={ (e) => setConfPass(e.target.value) } placeholder="Confirm your password" />
                    </FormField>
                </FormField>
                <FormActionSection>
                    <FormRegisterButton onClick={ addUser }>Register</FormRegisterButton>
                    <FormClearButton>Clear</FormClearButton>
                </FormActionSection>
            </FormContainer>
        </Container>
    )
}

export default RegisterUser

const Container = styled.div`
    background-color: white;
`

const Title = styled.span`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`

const FormContainer = styled.div`
    padding: 15px;
`

const FormField = styled.div`
    display: flex;
    padding: 5px;
    width: 100%;
    input[type=text] {
        font-size: 20px;
        height: 30px;
        outline: none;
        border: 0;
        text-align: center;
        border-radius: 10px;
        background-color: rgb(202, 202, 202);
        flex: 1;
    }
`

const FormLabel = styled.span`
    font-size: 20px;
    margin-right: 10px;
`

const FormTextField = styled.input`
    font-size: 20px;
    height: 30px;
    margin-right: 20px;
    outline: none;
    border: 0;
    text-align: center;
    border-radius: 10px;
    background-color: rgb(202, 202, 202);
    flex: 1;
`

const FormSelect = styled.select`
    font-size: 20px;
    height: 30px;
    outline: none;
    border: 0;
    text-align: center;
    border-radius: 10px;
    background-color: rgb(202, 202, 202);
`

const FormActionSection = styled.div`
    display: flex;
    justify-content: center;
`

const FormRegisterButton = styled.button`
    background-color: rgb(255, 145, 70);
    margin-right: 20px;
    font-size: 20px;
    height: 30px;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`

const FormClearButton = styled.div`
    background-color: rgb(255, 145, 70);
    font-size: 20px;
    height: 30px;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`