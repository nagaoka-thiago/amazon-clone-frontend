import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import RegisterProduct from './RegisterProduct'
import NumberFormat from 'react-number-format'
import { Table, Modal, Button, Figure, Spinner } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const axios = require('axios')

function ProductAdmin() {
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState({})
    const [showImage, setShowImage] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [loading, setLoading] = useState(true)

    const deleteProduct = () => {
        axios.delete(`/products/delete/${productSelected.nbr}`)
            .then(function(response) {
                const deletedProduct = response.data
                if(deletedProduct !== null && deletedProduct !== undefined)
                    setShowDeleteForm(false)
                    setLoading(true)
            })
    }

    useEffect(() => {
        if(loading) {
            axios.get('/products/')
                .then(function(response) {
                    setProducts([...response.data])
                    setLoading(false)
                })
        }
    }, [loading])

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
                            <td><Button variant="outline-primary" onClick={ () => {setProductSelected(product); setShowImage(true);} }>Show image</Button></td>
                            <td>{product.quantity}</td>
                            <td>{product.rating}</td>
                            <td><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                            <td>
                                <Button variant="outline-primary" onClick={() => { setProductSelected(product); setShowForm(true)} } className="mr-2"><EditIcon /></Button>
                                <Button variant="outline-primary" onClick={() => { setProductSelected(product); setShowDeleteForm(true)} } ><DeleteIcon /></Button>
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
                            <Button variant="outline-primary" onClick={() => { setProductSelected(null); setShowForm(true)} }><AddIcon /></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
            <Modal show={showImage}
                   onHide={ () => setShowImage(false) }
                   size="sm"
                   backdrop="static"
                   keyboard={false}
                   >
                <Modal.Header closeButton>
                    <Modal.Title>Product '{ productSelected ? productSelected.nbr : null }' image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Figure>
                        <Figure.Image width="100%" height="100%" src={ productSelected ? productSelected.image : null } />
                    </Figure>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShowImage(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showForm}
                   onHide={ () => setShowForm(false) }
                   size="lg"
                   backdrop="static"
                   keyboard={false}
                   >
                <Modal.Header closeButton>
                    <Modal.Title>{ productSelected ? `Product '${productSelected.title}' edition` : 'Registering product' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterProduct product={ productSelected } setShowForm={ setShowForm } setLoadingAdmin={ setLoading } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShowForm(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteForm}
                   onHide={ () => setShowDeleteForm(false) }
                   size="lg"
                   backdrop="static"
                   keyboard={false}
                   >
                <Modal.Header>
                    <Modal.Title>{ productSelected ? `Deleting product \'${productSelected.title}` : null }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Are you sure you want to delete product '{productSelected ? productSelected.title : ''}'?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                            onClick={ () => setShowDeleteForm(false) }>No</Button>
                    <Button variant="outline-primary"
                            onClick={ deleteProduct }>Yes</Button>
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