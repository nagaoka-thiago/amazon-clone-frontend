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
                <Nav.Link as={Button} variant="secondary" eventKey="logout" onClick={ logOutFunction }>Log out</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default HeaderAdmin