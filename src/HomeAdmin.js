import React from 'react'
import styled from 'styled-components'

function HomeAdmin() {
    return (
        <Container>
            <h1>Welcome to Administration</h1>
        </Container>
    )
}

export default HomeAdmin

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
`