import React, { useState } from 'react'
import styled from 'styled-components'
import {
    Link
} from "react-router-dom";

const axios = require('axios')

function Login({ setUser, sinalizeDataBase, setSinalizeDataBase }) {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const loginFunction = (e) => {
        e.preventDefault()
        if(userEmail.length > 0 && userPassword.length > 0) {
            if (userEmail !== "root") {
                axios.get(`/users/${userEmail}/${userPassword}`)
                    .then(function(response) {
                        var user = response.data
                        if (user) {
                            setUser(user)
                            localStorage.setItem('user', JSON.stringify(user))
                            setSinalizeDataBase(!sinalizeDataBase)
                        }
                    })
            } else if(userPassword === "1234") {
                alert("Logged in as Administrator")
            }
        }
    }
    return (
        <Container>
            <AmazonLogo src="data:image/png;base64,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" />
            <FormContent>
                <EmailField>
                    <FormLabel>E-mail</FormLabel>
                    <FormText type="text" onChange={ (e) => setUserEmail(e.target.value) } />
                </EmailField>
                <PasswordField>
                    <FormLabel>Password</FormLabel>
                    <FormText type="password" onChange={ (e) => setUserPassword(e.target.value) } />
                </PasswordField>
            </FormContent>
            <ButtonContainer>
                <LoginButton onClick={ loginFunction }>
                    Sign in
                </LoginButton>
                <RegisterButton>
                    <Link to="/register">Register new user</Link>
                </RegisterButton>
            </ButtonContainer>
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

const EmailField = styled.div`
    display: flex;
    margin-bottom: 5px;
`

const PasswordField = styled.div`
    display: flex;
    margin-top: 5px;
`

const FormLabel = styled.span`
    display: flex;
    margin-right: 5px;
    font-size: 20px;
    align-items: center;
    justify-content: center;
`

const FormText = styled.input`
    display: flex;
    margin-left: 5px;
    padding: 5px;
    width: 600px;
    height: 35px;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
    outline: none;
    background-color: rgb(202, 202, 202);
    outline: none;
    border: none;

`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const LoginButton = styled.button`
    margin-top: 50px;
    margin-right: 30px;
    background-color: rgb(255, 145, 70);
    outline: none;
    border: none;
    border-radius: 10px;
    height: 40px;
    width: 100px;
    overflow: hidden;
    font-size: 20px;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`

const RegisterButton = styled.button`
    margin-top: 50px;
    background-color: rgb(255, 145, 70);
    outline: none;
    border: none;
    border-radius: 10px;
    height: 40px;
    width: 200px;
    overflow: hidden;
    font-size: 20px;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
    a {
        text-decoration: none;
        color: black;
    }
`