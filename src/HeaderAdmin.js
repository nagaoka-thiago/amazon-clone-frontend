import React from 'react'
import styled from 'styled-components'
import {
    Link
  } from "react-router-dom";

function HeaderAdmin({ setUser, sinalizeDataBase, setSinalizeDataBase }) {

    const logOutFunction = (e) => {
        e.preventDefault()
        setUser(null)
        localStorage.setItem('user', null)
        setSinalizeDataBase(!sinalizeDataBase)
    }

    return (
        <Container>
            <Logo>
                <Link to="/">
                    <img src="https://previews.123rf.com/images/ionutparvu/ionutparvu1612/ionutparvu161201855/67603113-administration-stamp-sign-text-word-logo-blue-.jpg" />
                </Link>
            </Logo>
            <LinkSection>
                <Link to="/userscontrol">
                    <h1>Users</h1>
                </Link>
                <Link to="/productscontrol">
                    <h1>Products</h1>
                </Link>
                <LinkItem onClick={ logOutFunction }>
                    <h1>Log out</h1>
                </LinkItem>
            </LinkSection>
        </Container>
    )
}

export default HeaderAdmin

const Container = styled.div`
    display: flex;
    background-color: rgb(18, 21, 65);
    color: white;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.div`
    display: flex;
    height: 100%;
    cursor: pointer;
    flex: 0.07;
    img {
        width: 100%;
        height: 100%;
    }
`
const LinkSection = styled.div`
    display: flex;
    flex: 0.93;
    justify-content: space-between;
    a {
        text-decoration: none;
        color: white;
        display: flex;
        flex: 1;
        justify-content: center;
        :hover {
            background-color: rgb(221, 88, 0);
            cursor: pointer;
        }
    }
`

const LinkItem = styled.div`
    text-decoration: none;
    color: white;
    display: flex;
    flex: 1;
    justify-content: center;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`