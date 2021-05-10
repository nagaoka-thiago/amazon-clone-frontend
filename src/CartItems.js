import React from 'react'
import styled from 'styled-components'
import CartItem from './CartItem'

function CartItems({ user, cart, sinalizeDataBase, setSinalizeDataBase }) {
    return (
        <Container>
            <Title>
                <h2>Shopping cart</h2>
            </Title>
            <hr />
            {
                cart.map(item => {
                    return (
                        <CartItem key={ item.product.nbr }
                                    user={ user }
                                    nbr={ item.product.nbr }
                                    image={ item.product.image }
                                    title={ item.product.title }
                                    quantity={ item.product.quantity }
                                    price={ item.product.price }
                                    cart={ cart }
                                    sinalizeDataBase={ sinalizeDataBase }
                                    setSinalizeDataBase={ setSinalizeDataBase }
                                    />
                    )
                })
            }
        </Container>
    )
}

export default CartItems

const Container = styled.div`
    display: flex;
    flex: 0.8;
    flex-direction: column;
    background-color: white;
    margin: 10px;
    padding: 15px;
`

const Title = styled.div`
    display: flex;
    margin-bottom: 10px;
    h2 {
        font-size: 28px;
    }
`