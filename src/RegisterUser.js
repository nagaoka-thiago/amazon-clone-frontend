import React, { useState } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { Form, Col, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const axios = require('axios')

function RegisterUser({ user, setShowForm, setLoadingAdmin }) {
    const history = useHistory()
    const [cpf, setCpf] = useState(user ? user.cpf : '')
    const [name, setName] = useState(user ? user.name : '')
    const [birthday, setBirthday] = useState(user ? user.birthday : '')
    const [sex, setSex] = useState(user ? user.sex : '')
    const [address, setAddress] = useState(user ? user.address : '')
    const [number, setNumber] = useState(user ? user.nbr : '')
    const [city, setCity] = useState(user ? user.city : '')
    const [state, setState] = useState(user ? user.state : '')
    const [country, setCountry] = useState(user ? user.country : '')
    const [email, setEmail] = useState(user ? user.email : '')
    const [password, setPassword] = useState(user ? user.password : '')
    const [confPass, setConfPass] = useState(user ? user.password : '')
    const [messageDangerBirthday, setMessageDangerBirthday] = useState('Type a valid birthday!')
    const [messageDangerAdd, setMessageDangerAdd] = useState('')
    const [messageSuccessAdd, setMessageSuccessAdd] = useState('')
    const [loading, setLoading] = useState(false)

    const birthdayFormat = (dbFormat) => {
        const reg = /(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d)/
        const ex = reg.exec(dbFormat)
        const {year, month, day} = ex.groups
        
        return day + month + year
    }

    const isLeapYear = (n) => {
        return ((n % 400) === 0 || ((n % 4) === 0 && (n % 100) !== 0))
    }

    const verifyAndSetDate = (e) => {
        if(e.value.length === 8) {
            const reg = /(?<day>\d\d)\/(?<month>\d\d)\/(?<year>\d\d\d\d)/ //catches the day, month and the year of the text
            const ex = reg.exec(e.formattedValue)
            const {year, month, day} = ex.groups
            const today = new Date()
            if(parseInt(year) > today.getFullYear()) {
                setMessageDangerBirthday(`Type a valid year! (Less or equal than ${today.getFullYear()})`)
                setBirthday('')
            }
            else if(parseInt(month) < 1 || parseInt(month) > 12) {
                setMessageDangerBirthday('Type a valid month! (Between 1 and 12)')
                setBirthday('')
            }
            else if(parseInt(day) < 1) {
                setMessageDangerBirthday('Type a valid day! (Greater or equal to 1)')
                setBirthday('')
            }
            else if(parseInt(day) > 31) {
                setMessageDangerBirthday('Type a valid day! (Between 1 and 31)')
                setBirthday('')
            }
            else if(parseInt(month) === 4 || parseInt(month) === 6 || parseInt(month) === 9 || parseInt(month) === 11) {
                if(parseInt(day) > 30) {
                    setMessageDangerBirthday('Type a valid day! (Between 1 and 30)')
                    setBirthday('')
                }
                else setBirthday(year + "-" + month + "-" + day)
            }
            else if(parseInt(month) === 2) {
                if(isLeapYear(parseInt(year))) {
                    if(parseInt(day) > 29) {
                        setMessageDangerBirthday(`Type a valid day! (Between 1 and 29 because ${year} is a leap year)`)
                        setBirthday('')
                    }
                    else setBirthday(year + "-" + month + "-" + day)
                }
                else if(parseInt(day) > 28) {
                    setMessageDangerBirthday('Type a valid day! (Between 1 and 28)')
                    setBirthday('')
                }
                else setBirthday(year + "-" + month + "-" + day)
            }
        }
        else {
            setMessageDangerBirthday('Type a valid birthday!')
            setBirthday('')
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
                        setCpf('')
                    }
                    else setCpf(e.value)
            }
            else setCpf('')
        }
    }

    const addUser = () => {
        setLoading(true)
        if(name === "") setMessageDangerAdd('Type your name!')
        else if(cpf === "") setMessageDangerAdd('Type your CPF!')
        else if(birthday === "") setMessageDangerAdd('Type your birthday!')
        else if(sex === " ") setMessageDangerAdd('Select your gender!')
        else if(address === "") setMessageDangerAdd('Type your address!')
        else if(number === "") setMessageDangerAdd('Type your address number!')
        else if(city === "") setMessageDangerAdd('Type your city!')
        else if(state === "") setMessageDangerAdd('Type your state!')
        else if(country === "") setMessageDangerAdd('Type your country!')
        else if(email === "") setMessageDangerAdd('Type your e-mail!')
        else if(password === "") setMessageDangerAdd('Type a password!')
        else if(confPass === "") setMessageDangerAdd('Confirm your password!')
        else if(password !== confPass) setMessageDangerAdd('Typed password does not match with your confirmed password!')
        else {
            axios.get(`/users/${cpf}`)
                .then(function(response) {
                    const oldUser = response.data
                    
                    if(oldUser === null || oldUser === undefined || oldUser === "") {
                        axios.post('/users/add/', {
                            cpf,
                            name,
                            birthday,
                            sex,
                            address,
                            nbr: number,
                            city,
                            state,
                            country,
                            email,
                            password
                        }).then(function(response) {
                            const newUser = response.data
                            setMessageSuccessAdd(`User ${newUser.name} registered successfully!`)
                            setMessageDangerAdd('')
                            setTimeout(() => {
                                setLoading(false)
                                history.goBack()
                            }, 3000)
                        })
                    }
                    else if(!user) {
                        setMessageSuccessAdd('')
                        setMessageDangerAdd(`User ${name} could not be registered, verify if you have already registered with this CPF: ${cpf}`)
                    }
                    else {
                        axios.put('/users/update/', {
                            cpf,
                            name,
                            birthday,
                            sex,
                            address,
                            nbr: number,
                            city,
                            state,
                            country,
                            email,
                            password
                        }).then(function(response) {
                            const newUser = response.data
                            setMessageSuccessAdd(`User ${newUser.name} updated successfully!`)
                            setMessageDangerAdd('')
                            setTimeout(() => {
                                setLoading(false)
                                setShowForm(false)
                                setLoadingAdmin(true)
                            }, 3000)
                        })
                    }
                })
        }
    }

    return (
        <Container>
            {
                !user ? ( <Title>Registering user</Title> ) : null
            }
            <FormContainer>
                <Form>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="nameContainer">
                            <Form.Label>Your complete name</Form.Label>
                            <Form.Control type="text" defaultValue={ user ? user.name : '' } placeholder="Place your complete name" onChange={ (e) => { setName(e.target.value) } } />
                            {
                                name.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                        Type your complete name.
                                                     </Form.Text>
                                                    ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="cpfContainer">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control as={ NumberFormat } format="###.###.###-##" mask="_" defaultValue={ user ? user.cpf : '' } onValueChange={ verifyAndSetCpf } placeholder="Place your CPF" />
                            {
                                cpf.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                        Type a valid CPF.
                                                    </Form.Text>
                                                    ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="birthdayContainer">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control as={ NumberFormat } format="##/##/####" mask="_" defaultValue={ user ? birthdayFormat(user.birthday) : '' } onValueChange={ verifyAndSetDate } placeholder="Place your Birthday" />
                            {
                                birthday.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            {messageDangerBirthday}
                                                         </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="sexContainer">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control as="select" defaultValue={ user ? user.sex : ' ' } onChange={ (e) => setSex(e.target.value) }>
                                <option value=" ">Select your gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Others</option>
                            </Form.Control>
                            {
                                sex === " " || sex === "" ? (<Form.Text as={ Alert } variant="danger">
                                                            You must select your gender.
                                                         </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="addressStreetContainer">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" defaultValue={ user ? user.address : '' } onChange={ (e) => setAddress(e.target.value) } placeholder="Place your address street" />
                            {
                                address.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type your address's street.
                                                        </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="addressNumberContainer">
                            <Form.Label>Number</Form.Label>
                            <Form.Control as={ NumberFormat } defaultValue={ user ? user.nbr : '' } onValueChange={ (e) => setNumber(e.value) } placeholder="Place your address number" />
                            {
                                number.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type your address's number.
                                                        </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="cityContainer">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" defaultValue={ user ? user.city : '' } onChange={ (e) => setCity(e.target.value) } placeholder="Place your city" />
                            {
                                city.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type your city.
                                                        </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="stateContainer">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" defaultValue={ user ? user.state : '' } onChange={ (e) => setState(e.target.value) } placeholder="Place your state" />
                            {
                                state.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type your state.
                                                        </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="countryContainer">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" defaultValue={ user ? user.state : ' ' } onChange={ (e) => setCountry(e.target.value) } placeholder="Place your country" />
                            {
                                state.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type your country.
                                                        </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="emailContainer">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" defaultValue={ user ? user.email : ' ' } onChange={ (e) => setEmail(e.target.value) } placeholder="Type your e-mail" />
                            {
                                email.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type your e-mail.
                                                        </Form.Text>
                                                        ) : null
                            }
                        </Form.Group>
                    </Form.Row>
                        {
                            !user ? (
                                <Form.Row>
                                    <Form.Group as={ Col } controlId="passwordContainer">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" defaultValue={ user ? user.password : '' } onChange={ (e) => setPassword(e.target.value) } placeholder="Type your password" />
                                        {
                                            password.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                                        Type your password.
                                                                    </Form.Text>
                                                                    ) : null
                                        }
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="confPassContainer">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control type="password" defaultValue={ user ? user.password : '' } onChange={ (e) => setConfPass(e.target.value) } placeholder="Confirm your password" />
                                        {
                                            confPass.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                                        Confirm your password.
                                                                    </Form.Text>
                                                                    ) : null
                                        }
                                    </Form.Group>
                                </Form.Row>
                            ) : null
                        }
                    <Form.Row>
                        {
                            messageDangerAdd.length > 0 ? (<Form.Text as={ Alert } variant="danger">
                                                        { messageDangerAdd }
                                                    </Form.Text>
                                                    ) : null
                        }
                        {
                            messageSuccessAdd.length > 0 ? (<Form.Text as={ Alert } variant="success">
                                                        { messageSuccessAdd }
                                                    </Form.Text>
                                                    ) : null
                        }
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="registerButtonContainer">
                            <Button onClick={ addUser } variant="outline-primary">
                                { loading ? "Loading..." : user ? "Update" : "Register" }
                            </Button>
                        </Form.Group>
                        {
                            !user ? (
                                        <Form.Group as={ Col } controlId="backButtonContainer">
                                            <Button variant="outline-primary" onClick={ () => history.goBack() }>
                                                Go back
                                            </Button>
                                        </Form.Group>
                                     ) : null
                        }
                    </Form.Row>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default RegisterUser

const Container = styled.div`
    background-color: white;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`

const FormContainer = styled.div`
    padding: 15px;
`