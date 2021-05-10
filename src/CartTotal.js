import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

function CartTotal({ user, cart }) {
    return (
        <Container>
            <TextContainer>
                <LabelContainer>Subtotal ({
                                            cart.reduce((acc, o) => acc + o.quantity, 0)
                                          } items):</LabelContainer>
                <TotalContainer>
                    <NumberFormat 
                        value={cart.reduce((acc, o) => acc + o.product.price * o.quantity, 0)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'} /></TotalContainer>
            </TextContainer>
            <ActionContainer>
                <ActionButton>Proceed to checkout</ActionButton>
            </ActionContainer>
        </Container>
    )
}

export default CartTotal

const Container = styled.div`
    display: flex;
    flex: 0.2;
    background-color: white;
    margin: 10px;
    padding: 15px;
    flex-direction: column;
`

const TextContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`

const LabelContainer = styled.div`
    font-size: 20px;
    margin-right: 5px;
`

const TotalContainer = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const ActionContainer = styled.div`
    display: flex;
    flex-grow: 1;
`

const ActionButton = styled.div`
    display: flex;
    flex-grow: 1;
    height: 35px;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 145, 70);
    border-radius: 10px;
    overflow: hidden;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`