import React from 'react'
import styled from 'styled-components'
import {
    Link
  } from "react-router-dom";
import { Nav, Button } from 'react-bootstrap';

function HeaderAdmin({ setUser, sinalizeDataBase, setSinalizeDataBase }) {

    const logOutFunction = (e) => {
        e.preventDefault()
        setUser(null)
        localStorage.setItem('user', null)
        setSinalizeDataBase(!sinalizeDataBase)
    }

    return (
        /*<Container>
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
        </Container>*/
        <Nav variant="pills" defaultActiveKey="home">
            <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="home">Administration</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/userscontrol" eventKey="users">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productscontrol" eventKey="products">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Button} variant="secondary" onClick={ logOutFunction }>Log out</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default HeaderAdmin