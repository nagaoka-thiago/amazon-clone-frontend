import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import Product from './Product'

const axios = require('axios')

function Home({ user, cart, sinalizeDataBase, setSinalizeDataBase }) {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        axios.get('/products/')
        .then(function(response) {
            setProducts(response.data)
            })
    }, [])

    return (
        <Container>
            <Banner />
            <Content>
                {
                    products.map(product => <Product key={product.nbr}
                                                     user={ user }
                                                     nbr={product.nbr} 
                                                     title={product.title}
                                                     price={product.price}
                                                     rating={product.rating}
                                                     image={product.image}
                                                     cart={cart}
                                                     sinalizeDataBase={ sinalizeDataBase }
                                                     setSinalizeDataBase={ setSinalizeDataBase }
                                                     /> )
                }
            </Content>
        </Container>
    )
}

export default Home

const Container = styled.div`
    max-width: 1500px;
    margin: 0 auto;
`

const Banner = styled.div`
    background-image: url('https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg');
    min-height: 600px;
    background-position: center;
    background-size: cover;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`

const Content = styled.div`
    display: flex;
    background: white;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: -350px;
    flex-wrap: wrap;
`