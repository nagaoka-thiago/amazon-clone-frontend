import React, { useState } from 'react'
import styled from 'styled-components'
import {
    Link
} from "react-router-dom";
import { Button, Form, Col, Alert } from 'react-bootstrap';

const axios = require('axios')

function Login({ setUser, sinalizeDataBase, setSinalizeDataBase }) {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isUserIncorrect, setIsUserIncorrect] = useState(false)

    const loginFunction = (e) => {
        e.preventDefault()
        setLoading(true)
        if(userEmail.length > 0 && userPassword.length > 0) {
            if (userEmail !== "admin") {
                axios.get(`/users/${userEmail}/${userPassword}`)
                    .then(function(response) {
                        var user = response.data
                        if (user) {
                            setUser(user)
                            localStorage.setItem('user', JSON.stringify(user))
                            setLoading(false)
                            setSinalizeDataBase(!sinalizeDataBase)
                        }
                        else {
                            setLoading(false)
                            setIsUserIncorrect(true)
                        }
                    })
            } else if(userPassword === "1234") {
                setUser({ isAdmin: true })
                localStorage.setItem('user', JSON.stringify({ isAdmin: true }))
                setLoading(false)
                setSinalizeDataBase(!sinalizeDataBase)
            }
        }
        else {
            setLoading(false)
        }
    }
    return (
        <Container>
            <AmazonLogo src="data:image/png;base64,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" />
            <FormContent>
                <Form>
                    <Form.Row>
                    <Form.Group as={ Col } controlId="emailContainer">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email"
                                      placeholder="Place an email"
                                      onChange={ (e) => { setUserEmail(e.target.value); setIsUserIncorrect(false) } } />
                        {
                            userEmail.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                        Type an e-mail.
                                                      </Form.Text>) : null
                        }
                    </Form.Group>
                    <Form.Group as={ Col } controlId="passwordContainer">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Place a password"
                                      onChange={ (e) => { setUserPassword(e.target.value); ; setIsUserIncorrect(false) }} />
                        {
                            userPassword.length === 0 ? (<Form.Text as={ Alert } variant="danger">
                                                            Type a password.
                                                        </Form.Text>) : null
                        }
                    </Form.Group>
                    {
                        isUserIncorrect ? (<Form.Group controlId="generalAlert">
                                            <Form.Text as={ Alert } variant="danger">
                                                Check if you are typing your e-mail and password correctly.
                                            </Form.Text>
                                           </Form.Group>) : null
                    }
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="loginButtonContainer">
                            <Button variant="outline-primary" onClick={ loginFunction }>
                                { loading ? "Loading..." : "Login" }
                            </Button>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="registerButtonContainer">
                            <Button as={Link} to="/register" variant="outline-primary">
                                Register
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </FormContent>
        </Container>
    )
}

export default Login

const Container = styled.div`
    padding: 100px;
    background-color: white;
    text-align: center;
`

const AmazonLogo = styled.img`
    height: 100px;
    margin-bottom: 40px;
`

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`