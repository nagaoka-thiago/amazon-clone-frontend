import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Table, Modal, Button, Figure, Spinner } from 'react-bootstrap'

const axios = require('axios')

function ProductAdmin() {
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(loading) {
            axios.get('/products/')
                .then(function(response) {
                    setProducts([...response.data])
                    setLoading(false)
                })
        }
    }, [])

    return (
        <Container>
            <Title>
                <h1>Product controlling section</h1>
            </Title>
            <Table hover>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Image's URL</th>
                        <th>Quantity</th>
                        <th>Rating</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(product =>
                        <tr key={product.nbr}>
                            <td>{product.nbr}</td>
                            <td>{product.title}</td>
                            <td><Button variant="primary" onClick={ () => {setShow(true); setImageUrl(product.image)} }>Show image</Button></td>
                            <td>{product.quantity}</td>
                            <td>{product.rating}</td>
                            <td>{product.price}</td>
                            <td>My actions</td>
                        </tr>
                        )
                }
                </tbody>
            </Table>
            <Modal show={show}
                   onHide={ () => setShow(false) }
                   size="sm"
                   >
                <Modal.Header closeButton>
                    <Modal.Title>Product's image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Figure>
                        <Figure.Image width="100%" height="100%" src={ imageUrl } />
                    </Figure>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShow(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
            {
                loading ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                          ) : null
            }
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