import React, { useState } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { Form, Col, Button, Alert, Modal, Figure } from 'react-bootstrap'

const axios = require('axios')

function RegisterProduct({ product, setShowForm, setLoadingAdmin }) {
    const number = product ? product.nbr : ''
    const [title, setTitle] = useState(product ? product.title : '')
    const [image, setImage] = useState(product ? product.image : '')
    const [showImage, setShowImage] = useState(false)
    const [quantity, setQuantity] = useState(product ? product.quantity : '')
    const [rating, setRating] = useState(product ? product.rating : '')
    const [price, setPrice] = useState(product ? product.price : '')
    const [messageDangerAdd, setMessageDangerAdd] = useState('')
    const [messageSuccessAdd, setMessageSuccessAdd] = useState('')
    const [loading, setLoading] = useState(false)

    const addProduct = () => {
        setLoading(true)
        if(title.length === 0) {
            setLoading(false)
            setMessageDangerAdd('Type a title.')
            setMessageSuccessAdd('')
        }
        else if(image.length === 0) {
            setLoading(false)
            setMessageDangerAdd('Type an image\'s URL.')
            setMessageSuccessAdd('')
        }
        else if(quantity.length === 0) {
            setLoading(false)
            setMessageDangerAdd('Type a quantity.')
            setMessageSuccessAdd('')
        }
        else if(rating.length === 0) {
            setLoading(false)
            setMessageDangerAdd('Type a rating.')
            setMessageSuccessAdd('')
        }
        else if(price.length === 0) {
            setLoading(false)
            setMessageDangerAdd('Type a title.')
            setMessageSuccessAdd('')
        }
        else if(product) {
            axios.put(`/products/update/${product.nbr}`, {
                nbr: product.nbr,
                title,
                image,
                quantity,
                rating,
                price
            })
                .then(function(response) {
                    const updatedProduct = response.data
                        if(updatedProduct) {
                            setMessageDangerAdd(``)
                            setMessageSuccessAdd(`Product \'${ updatedProduct.title }\' updated successfully!`)
                            
                            setTimeout(() => {
                                setMessageSuccessAdd('')
                                setShowForm(false)
                                setLoading(false)
                                setLoadingAdmin(true)
                            }, 3000)
                        }
                        else {
                            setMessageDangerAdd(`Product \'${ updatedProduct.title }\' could not be updated!`)
                            setMessageSuccessAdd('')
                        }
                })
        }
        else {
            axios.post('/products/add/', {
                title,
                image,
                quantity,
                rating,
                price
            })
                .then(function(response) {
                    const newProduct = response.data
                    if(newProduct) {
                        setMessageDangerAdd(``)
                        setMessageSuccessAdd(`Product \'${newProduct.title}\' registered successfully!`)
                        setTimeout(() => {
                            setMessageSuccessAdd('')
                            setShowForm(false)
                            setLoading(false)
                            setLoadingAdmin(true)
                        }, 3000)
                    }
                    else {
                        setMessageDangerAdd(`Product \'${newProduct.title}\' could not be registered!`)
                        setMessageSuccessAdd('')
                    }
                })
        }
    }

    return (
        <Container>
            <FormContainer>
                <Form>
                    <Form.Row>
                        {
                            number.length !== 0 ? (
                                        <Form.Group as={ Col } controlId="numberContainer">
                                            <Form.Label>Number</Form.Label>
                                            <Form.Control as={ NumberFormat } defaultValue={ number } readOnly />
                                        </Form.Group>
                                      ) : null
                        }
                        <Form.Group as={ Col } controlId="titleContainer">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" defaultValue={ product ? product.title : '' } onChange={ (e) => setTitle(e.target.value) } placeHolder="Place product's title" />
                            {
                                title.length === 0 ? (
                                                        <Form.Text as={ Alert } variant="danger">
                                                            Type product's title
                                                        </Form.Text>
                                                     ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="imageContainer">
                            <Form.Label>Image's URL</Form.Label>
                            <Form.Control type="text" defaultValue={ image } onChange={ (e) => setImage(e.target.value) } placeHolder="Place product's image" />
                            {
                                image.length > 0 ? ( <Form.Control as={ Button } variant="outline-primary" onClick={ () => { setShowImage(true); } } >Show Image</Form.Control> ) : null
                            }
                            {
                                image.length === 0 ? (
                                                        <Form.Text as={ Alert } variant="danger">
                                                            Type product's image
                                                        </Form.Text>
                                                     ) : null
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="quantityContainer">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control as={ NumberFormat } defaultValue={ quantity } onValueChange={ (e) => setQuantity(e.value) } placeHolder="Place product's quantity" />
                            {
                                quantity.length === 0 ? (
                                                        <Form.Text as={ Alert } variant="danger">
                                                            Type product's quantity
                                                        </Form.Text>
                                                    ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="ratingContainer">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as={ NumberFormat } defaultValue={ rating } onValueChange={ (e) => setRating(e.value) } placeHolder="Place product's rating" />
                            
                            {
                                rating.length === 0 ? (
                                                        <Form.Text as={ Alert } variant="danger">
                                                            Type product's rating
                                                        </Form.Text>
                                                     ) : null
                            }
                        </Form.Group>
                        <Form.Group as={ Col } controlId="priceContainer">
                            <Form.Label>Price</Form.Label>
                            <Form.Control as={ NumberFormat } thousandSeparator={true} prefix={'$'} defaultValue={ price } onValueChange={ (e) => setPrice(e.value) } placeHolder="Place product's price" />
                            {
                                price.length === 0 ? (
                                                        <Form.Text as={ Alert } variant="danger">
                                                            Type product's price
                                                        </Form.Text>
                                                     ) : null
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        {
                            messageDangerAdd.length > 0 ? (<Form.Text as={ Alert } variant="danger">
                                                        { messageDangerAdd }
                                                    </Form.Text>
                                                    ) : null
                        }
                        {
                            messageSuccessAdd.length > 0 ? (<Form.Text as={ Alert } variant="success">
                                                        { messageSuccessAdd }
                                                    </Form.Text>
                                                    ) : null
                        }
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="registerButtonContainer">
                            <Button onClick={ addProduct } variant="outline-primary" disabled={ loading }>
                                { loading ? "Loading..." : product ? "Update" : "Register" }
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </FormContainer>
            <Modal show={showImage}
                   onHide={ () => setShowImage(false) }
                   size="sm"
                   backdrop="static"
                   keyboard={false}
                   >
                <Modal.Header closeButton>
                    <Modal.Title>Product's image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Figure>
                        <Figure.Image width="100%" height="100%" src={ image.length > 0 ? image : null } />
                    </Figure>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={ () => setShowImage(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default RegisterProduct

const Container = styled.div`
    background-color: white;
`

const FormContainer = styled.div`
    padding: 15px;
`