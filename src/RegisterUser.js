import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

function RegisterUser() {
    return (
        <Container>
            <Title>Registering user</Title>
            <FormContainer>
                <FormField>
                    <FormLabel>Your complete name</FormLabel>
                    <FormTextField type="text" />
                </FormField>
                <FormField>
                    <FormLabel>CPF</FormLabel>
                    <NumberFormat format="###.###.###-##" mask="_" placeholder="Place your CPF" />
                </FormField>
                <FormField>
                    <FormLabel>Birthday</FormLabel>
                    <NumberFormat format="##/##/####" mask="_" placeholder="Place your Birthday" />
                </FormField>
                <FormField>
                    <FormLabel>Sex</FormLabel>
                    <FormSelect>
                        <option value=" ">Select your gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Others</option>
                    </FormSelect>
                </FormField>
                <FormField>
                    <FormLabel>Address</FormLabel>
                    <FormTextField type="text" />
                    <FormTextField type="text" />
                </FormField>
                <FormField>
                    <FormLabel>Address number</FormLabel>
                    <FormTextField type="text" />
                </FormField>
                <FormField>
                    <FormLabel>City</FormLabel>
                    <FormTextField type="text" />
                </FormField>
                <FormField>
                    <FormLabel>State</FormLabel>
                    <FormTextField type="text" />
                </FormField>
                <FormField>
                    <FormLabel>Country</FormLabel>
                    <FormTextField type="text" />
                </FormField>
                <FormField>
                    <FormLabel>E-mail</FormLabel>
                    <FormTextField type="email" />
                </FormField>
                <FormField>
                    <FormLabel>Password</FormLabel>
                    <FormTextField type="password" />
                </FormField>
                <FormField>
                    <FormLabel>Confirm password</FormLabel>
                    <FormTextField type="password" />
                </FormField>
                <FormActionSection>
                    <FormRegisterButton>Register</FormRegisterButton>
                    <FormClearButton>Clear</FormClearButton>
                </FormActionSection>
            </FormContainer>
        </Container>
    )
}

export default RegisterUser

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 200px;
`

const Title = styled.span`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`

const FormContainer = styled.div`
    box-shadow: 0 1px 3px gray;
    padding: 15px;
`

const FormField = styled.div`
    padding: 5px;
    input[type=text] {
        font-size: 20px;
        height: 30px;
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
    
`

const FormSelect = styled.select`
    font-size: 20px;
    height: 30px;
`

const FormActionSection = styled.div``

const FormRegisterButton = styled.button`
    background-color: rgb(255, 145, 70);
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`

const FormClearButton = styled.button`
    background-color: rgb(255, 145, 70);
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`