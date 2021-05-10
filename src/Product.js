import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
const axios = require('axios')

function Product({ user, nbr, title, price, rating, image, cart, sinalizeDataBase, setSinalizeDataBase }) {
    const AddCart = (event) => {
        event.preventDefault()
        if (!cart.find(c => c.user.cpf === user.cpf && c.product.nbr === nbr)) {
            axios.post(`http://localhost:8080/cartitems/add/${user.cpf}/${nbr}`)
                .then(function(response) {
                    const item = response.data
                    if(item)
                        setSinalizeDataBase(!sinalizeDataBase)
                    else
                        alert('There was a problem adding the product \'' + title + '\' to your cart.')
                })
        }
        else {
            alert('The product \'' + title + '\' is already on your cart.')
        }
    }
    return (
        <Container>
            <Title>{title}</Title>
            <Price><NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Price>
            <Rating>
                {
                    Array(rating)
                        .fill()
                        .map(() => <p key={Math.random()}>⭐</p>)
                }
            </Rating>
            <Image src={image} />
            <ActionSection>
                <AddToCartButton onClick={ AddCart }>Add to Cart</AddToCartButton>
            </ActionSection>
        </Container>
    )
}

export default Product

const Container = styled.div`
    background-color: white;
    max-height: 400px;
    z-index: 100;
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    flex-flow: column wrap;
`

const Title = styled.span``

const Price = styled.span`
    font-weight: 500;
    margin-top: 3px;
`

const Rating = styled.div`
    display: flex;
`

const Image = styled.img`
    max-height: 200px;
    object-fit: contain;
`

const ActionSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

const AddToCartButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: rgb(255, 145, 70);
    border: 1px solid transparent;
    border-radius: 10px;
    outline: none;
    :hover {
        background-color: rgb(221, 88, 0);
        cursor: pointer;
    } 
`