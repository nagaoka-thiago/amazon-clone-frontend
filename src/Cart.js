import React from 'react'
import styled from 'styled-components'
import CartItems from './CartItems'
import CartTotal from './CartTotal'

function Cart({ user, cart, sinalizeDataBase, setSinalizeDataBase }) {

    return (
        <Container>
            <CartItems user={ user } cart={ cart } sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
            <CartTotal user={ user } cart={ cart } />
        </Container>
    )
}

export default Cart

const Container = styled.div`
    display: flex;
`