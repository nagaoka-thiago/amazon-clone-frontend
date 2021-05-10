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
                        <option value="M">Male</option>
                        <option value="F">Female</option>
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
    background-color: white;
    padding: 100px;
`

const Title = styled.span`
    font-size: 30px;
    font-weight: 600;
`

const FormContainer = styled.div`
    box-shadow: 0 1px 3px gray;
`

const FormField = styled.div``

const FormLabel = styled.span``

const FormTextField = styled.input``

const FormSelect = styled.select``

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