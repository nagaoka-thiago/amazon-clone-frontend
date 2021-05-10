import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

const axios = require('axios')

function CartItem({ user, nbr, image, title, quantity, price, cart, sinalizeDataBase, setSinalizeDataBase}) {

    const generateOptions = () => {
        const options = []
        for (let i = 1; i <= quantity; i++) {
            options.push(<option key={Math.random()} value = {i}>Qty: {i}</option>)
        }
        return options
    }

    const generateSelect = () => {
        const item = cart.find(c => c.user.cpf === user.cpf && c.product.nbr === nbr)
        if(item !== undefined) {
            return (
                <select value = { item.quantity } onChange={ changeQuantity }>
                    {
                            generateOptions()
                    }
                </select>
            )
        }
    }

    const changeQuantity = (event) => {
        event.preventDefault()
        const item = cart.find(c => c.user.cpf === user.cpf && c.product.nbr === nbr)
        if (item !== undefined) {
            item.quantity = event.target.value
            axios.put(`/cartitems/update/`, item)
            .then(function(response) {
                const item = response.data
                if(item)
                    setSinalizeDataBase(!sinalizeDataBase)
                else
                        alert('There was a problem updating the amount of the following product: \'' + title + '\' on your cart.')
                
            })
        }
    }
    
    const deleteFunction = (event) => {
        event.preventDefault()
        axios.delete(`/cartitems/delete/${user.cpf}/${nbr}`)
            .then(function(response) {
                const item = response.data
                if(item)
                    setSinalizeDataBase(!sinalizeDataBase)
                else
                    alert('There was a problem deleting the following product: \'' + title + '\' on your cart.')
            })
    }

    return (
        <Container>
            <ImageContainer>
                <img src={ image } alt={ title } />
            </ImageContainer>
            <Info>
                <InfoTitle>
                    <h2>{ title }</h2>
                </InfoTitle>
                <InfoActionSection>
                    <InfoActionQuantity>{
                                            generateSelect()
                                        }
                    </InfoActionQuantity>
                    <InfoActionDelete onClick={ deleteFunction }>Delete</InfoActionDelete>
                </InfoActionSection>
            </Info>
            <PriceContainer>
                <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </PriceContainer>
        </Container>
    )
}

export default CartItem

const Container = styled.div`
    display: flex;
    margin: 10px;
    padding: 10px;
    justify-content: space-between;
    border: 1px solid transparent;
    border-bottom: 1px solid #DDD;
    :hover {
        border: 1px solid black;
    }
`

const ImageContainer = styled.div`
    display: flex;
    width: 100px;
    object-fit: contain;
    margin-right: 20px;
    img {
        width: 100%;
        height: 100%;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const InfoTitle = styled.div`
    display: flex;
`

const InfoActionSection = styled.div`
    display: flex;
    margin: 10px;
`

const InfoActionQuantity = styled.div`
    width: 70px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    select {
        width: 100%;
        height: 100%;
        background-color: #F0F2F2;
        outline: none;
        border: none;
    }
    border: 1px solid black;
`

const InfoActionDelete = styled.div`
    display: flex;
    width: 60px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
    margin-left: 20px;
    background-color: rgb(255, 145, 70);
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    }
`

const PriceContainer = styled.div`
    font-size: 20px;
    font-weight: 700;
`