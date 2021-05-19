import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import RegisterProduct from './RegisterProduct'
import { Table, Modal, Button, Figure, Spinner } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const axios = require('axios')

function ProductAdmin() {
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState({})
    const [showImage, setShowImage] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [showForm, setShowForm] = useState(false)
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
            <Table size="sm" hover>
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
                            <td><Button variant="outline-primary" onClick={ () => {setImageUrl(product.image); setShowImage(true);} }>Show image</Button></td>
                            <td>{product.quantity}</td>
                            <td>{product.rating}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => { setProductSelected(product); setShowForm(true)} }><EditIcon /></Button>
                                <Button variant="outline-primary" onClick={() => { setProductSelected(product); setShowForm(true)} }><DeleteIcon /></Button>
                            </td>
                        </tr>
                        )
                }
                    <tr>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>
                            <Button variant="outline-primary" onClick={() => setShowForm(true)}><AddIcon /></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
            <Modal show={showImage}
                   onHide={ () => setShowImage(false) }
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
                            onClick={ () => setShowImage(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showForm}
                   onHide={ () => setShowForm(false) }
                   size="sm"
                   >
                <Modal.Header closeButton>
                    <Modal.Title>Product '{productSelected.title}' edition </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterProduct product={ productSelected } setLoadingAdmin={ setLoading } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShowForm(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
            {
                loading ? (
                            <LoadingContainer>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </LoadingContainer>
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

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`