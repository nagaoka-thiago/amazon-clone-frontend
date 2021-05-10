import React from 'react'
import styled from 'styled-components'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import ShopIcon from '@material-ui/icons/Shop';
import {
    Link
  } from "react-router-dom";

function Header({ user, setUser, cart, sinalizeDataBase, setSinalizeDataBase }) {

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
                    <img src='https://mikekitko.com/wp-content/uploads/2019/10/amazon-logo-white-768x232.png' />
                </Link>
            </Logo>
            <HeaderButton>
                <LocationOnIcon />
                <HeaderOption>
                    <HeaderLineOne>Deliver to</HeaderLineOne>
                    <HeaderLineTwo>Select your Address</HeaderLineTwo>
                </HeaderOption>
            </HeaderButton>
            <SearchTool>
                <SearchToolInput type='text' />
                <SearchToolIcon>
                    <SearchIcon />
                </SearchToolIcon>
            </SearchTool>
            <HeaderButton onClick={ logOutFunction }>
                <HeaderOption>
                    <HeaderLineOne>Hello, {user.name}</HeaderLineOne>
                    <HeaderLineTwo>Logout</HeaderLineTwo>
                </HeaderOption>
            </HeaderButton>
            <HeaderButton>
                <HeaderOption>
                    <HeaderLineOne>Returns</HeaderLineOne>
                    <HeaderLineTwo>& Orders</HeaderLineTwo>
                </HeaderOption>
            </HeaderButton>
            <HeaderCart>
                <Link to={'/cart'}>
                    <ShopIcon />
                    <CartCount>{cart.reduce((acc, o) => acc + o.quantity, 0)}</CartCount>
                </Link>
            </HeaderCart>
        </Container>
    )
}

export default Header

const Container = styled.div`
    display: flex;
    background-color: rgb(18, 21, 65);
    color: white;
    height: 60px;
    align-items: center;
    justify-content: space-between;
`

const Logo = styled.div`
    margin-left: 5px;
    img {
        width: 100px;
    }
`

const HeaderButton = styled.div`
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px 10px 5px 10px;
    border: 1px solid transparent;
    :hover {
        border: 1px solid white;
        cursor: pointer;
    }
`

const HeaderLineOne = styled.div``

const HeaderLineTwo = styled.div`
    font-weight: 700;
`

const SearchTool = styled.div`
    display: flex;
    flex-grow: 1;
    margin-left: 5px;
    border: 3px solid transparent;
    border-radius: 10px;
    overflow: hidden;
    :focus-within {
        border: 3px solid rgb(221, 88, 0);
    }
`

const SearchToolInput = styled.input`
    flex-grow: 1;
    height: 40px;
    outline: none;
    border: 0;
`

const SearchToolIcon = styled.div`
    display: flex;
    width: 45px;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 145, 70);
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`

const HeaderOption = styled.div`
    margin-left: 9px;
`

const HeaderCart = styled.div`
    a {
        display: flex;
        margin-left: 5px;
        margin-right: 5px;
        padding: 13px 10px 15px 10px;
        border: 1px solid transparent;
        text-decoration: none;
        color: white;
        :hover {
            border: 1px solid white;
            cursor: pointer;
        }
    }
`

const CartCount = styled.div`
    font-weight: 700;
`