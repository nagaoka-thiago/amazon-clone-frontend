import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const axios = require('axios')

function ProductAdmin() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/products/')
            .then(function(response) {
                setProducts([...response.data])
            })
    }, [])

    return (
        <Container>
            <Title>
                <h1>Product controlling section</h1>
            </Title>
            <TableContent>
                <Line>
                    <LineHeader>Number</LineHeader>
                    <LineHeader>Title</LineHeader>
                    <LineHeader>Image's URL</LineHeader>
                    <LineHeader>Quantity</LineHeader>
                    <LineHeader>Rating</LineHeader>
                    <LineHeader>Price</LineHeader>
                    <LineHeader>Action</LineHeader>
                </Line>
                {
                    products.map(product =>
                        <Line key={product.nbr}>
                            <LineDisplay>{product.nbr}</LineDisplay>
                            <LineDisplay>{product.title}</LineDisplay>
                            <LineDisplay>{product.image}</LineDisplay>
                            <LineDisplay>{product.quantity}</LineDisplay>
                            <LineDisplay>{product.rating}</LineDisplay>
                            <LineDisplay>{product.price}</LineDisplay>
                            <LineDisplay>My actions</LineDisplay>
                        </Line>
                        )
                }
            </TableContent>
    </Container>
    )
}

export default ProductAdmin

const Container = styled.div`
    background-color: white;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
`

const TableContent = styled.table`
    width: 100%;
    background-color: rgb(185, 185, 185);
`

const Line = styled.tr`
    :hover {
        background-color: rgb(149, 149, 149);
    }
`

const LineHeader = styled.th`
    text-align: left;
    flex: 1;
`

const LineDisplay = styled.td`
    text-align: left;
    flex: 1;
`