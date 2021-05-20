import React from 'react'
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
                <Nav.Link as={Link} to="/" eventKey="home" className="mr-2">Administration</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/userscontrol" eventKey="users" className="mr-2">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productscontrol" eventKey="products" className="mr-2">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Button} variant="outline-secondary" eventKey="logout" onClick={ logOutFunction }>Log out</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default HeaderAdmin