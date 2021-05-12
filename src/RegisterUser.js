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

    const isLeapYear = (n) => {
        return ((n % 400) === 0 || ((n % 4) === 0 && (n % 100) !== 0))
    }

    const verifyAndSetDate = (e) => {
        if(e.value.length === 8) {
            const reg = /(?<day>\d\d)\/(?<month>\d\d)\/(?<year>\d\d\d\d)/ //catches the day, month and the year of the text
            const ex = reg.exec(e.formattedValue)
            const {year, month, day} = ex.groups
            const today = new Date()
            if(parseInt(year) > today.getFullYear()) alert(`Type a valid year! (Less or equal than ${today.getFullYear()})`)
            else if(parseInt(month) < 1 || parseInt(month) > 12) alert('Type a valid month! (Between 1 and 12)')
            else if(parseInt(day) < 1) alert('Type a valid day! (Greater or equal to 1)')
            else if(parseInt(day) > 31) alert('Type a valid day! (Between 1 and 31)')
            else if(parseInt(month) === 4 || parseInt(month) === 6 || parseInt(month) === 9 || parseInt(month) === 11) {
                if(parseInt(day) > 30) alert('Type a valid day! (Between 1 and 30)')
                else setBirthday(year + "-" + month + "-" + day)
            }
            else if(parseInt(month) === 2) {
                if(isLeapYear(parseInt(year))) {
                    if(parseInt(day) > 29) alert(`Type a valid day! (Between 1 and 29 because ${year} is a leap year)`)
                    else setBirthday(year + "-" + month + "-" + day)
                }
                else if(parseInt(day) > 28) alert('Type a valid day! (Between 1 and 28)')
                else setBirthday(year + "-" + month + "-" + day)
            }
        }
    }

    const verifyAndSetCpf = (e) => {
        if(e.value.length === 11) {
            const reg = /(?<n11>\d)(?<n10>\d)(?<n9>\d).(?<n8>\d)(?<n7>\d)(?<n6>\d).(?<n5>\d)(?<n4>\d)(?<n3>\d)-(?<n2>\d)(?<n1>\d)/
            const ex = reg.exec(e.formattedValue)
            const {n11, n10, n9, n8, n7, n6, n5, n4, n3, n2, n1} = ex.groups
            const firstDigitVer = (((parseInt(n11) * 10 +
                                    parseInt(n10) * 9 +
                                    parseInt(n9) * 8 +
                                    parseInt(n8) * 7 +
                                    parseInt(n7) * 6 +
                                    parseInt(n6) * 5 +
                                    parseInt(n5) * 4 +
                                    parseInt(n4) * 3 +
                                    parseInt(n3) * 2) * 10) % 11) === parseInt(n2)
            if(firstDigitVer) {
                const secondDigitVer = ((parseInt(n11) * 11 +
                                         parseInt(n10) * 10 +
                                         parseInt(n9) * 9 +
                                         parseInt(n8) * 8 +
                                         parseInt(n7) * 7 +
                                         parseInt(n6) * 6 +
                                         parseInt(n5) * 5 +
                                         parseInt(n4) * 4 +
                                         parseInt(n3) * 3 +
                                         parseInt(n2) * 2) * 10 % 11) === parseInt(n1)
                    if(!secondDigitVer) {
                        alert(`${e.formattedValue} is an invalid CPF.`)
                    }
                    else setCpf(e.value)
            }
            else alert(`${e.formattedValue} is an invalid CPF.`)
        }
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
            axios.get(`/users/${cpf}`)
                .then(function(response) {
                    const user = response.data
                    console.log(user)
                    if(user === null || user === undefined || user === "") {
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
                            alert(`User ${newUser.name} registered successfully!`)
                            history.goBack()
                        })
                    }
                    else
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
                        <NumberFormat format="###.###.###-##" mask="_" onValueChange={ verifyAndSetCpf } placeholder="Place your CPF" />
                    </FormField>
                    <FormField>
                        <FormLabel>Birthday</FormLabel>
                        <NumberFormat format="##/##/####" mask="_" onValueChange={ verifyAndSetDate } placeholder="Place your Birthday" />
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
                    <FormField>
                        <FormLabel>Street</FormLabel>
                        <FormTextField type="text" onChange={ (e) => setAddress(e.target.value) } placeholder="Place your address street" />
                    </FormField>
                    <FormField>
                        <FormLabel>Number</FormLabel>
                        <NumberFormat onValueChange={ (e) => setNumber(e.value) } placeholder="Place your address number" />
                    </FormField>
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
                    <FormBackButton onClick={ () => history.goBack() }>Go back</FormBackButton>
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
    padding-bottom: 5px;
    width: 100%;
    input[type=text] {
        font-size: 20px;
        margin-right: 20px;
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
    margin-right: 20px;
    outline: none;
    border: 0;
    text-align: center;
    border-radius: 10px;
    background-color: rgb(202, 202, 202);
    flex: 1;
`

const FormActionSection = styled.div`
    display: flex;
    justify-content: center;
`

const FormRegisterButton = styled.button`
    margin-top: 50px;
    margin-right: 30px;
    background-color: rgb(255, 145, 70);
    outline: none;
    border: none;
    border-radius: 10px;
    width: 100px;
    overflow: hidden;
    font-size: 20px;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`

const FormBackButton = styled.button`
    margin-top: 50px;
    margin-right: 30px;
    background-color: rgb(255, 145, 70);
    outline: none;
    border: none;
    border-radius: 10px;
    width: 100px;
    overflow: hidden;
    font-size: 20px;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`