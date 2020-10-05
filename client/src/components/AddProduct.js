import React, { Component, Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Card,
    Alert, Container
} from 'reactstrap'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProduct } from '../actions/productActions'

class AddProduct extends Component {
    state = {
        name: '',
        price: 0,
        description: ''
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const newProduct = {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description
        }
        this.props.addProduct(newProduct)
        window.location.href = '/products'
    }

    render() {
        const { isAuthenticated, user } = this.props.authentication
        return (
            <div>
                <Container>
                    {user ? (<Fragment>{user.email == 'admin@test.com' ? (<Row>
                        <Col sm="6" className="m-auto">
                            <Card body>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="name"
                                            onChange={this.onChange}
                                        />
                                        <Label for="price">Price</Label>
                                        <Input
                                            type="text"
                                            name="price"
                                            id="price"
                                            placeholder="price"
                                            onChange={this.onChange}
                                        />
                                        <Label for="description">Description</Label>
                                        <Input
                                            type="text"
                                            name="description"
                                            id="description"
                                            placeholder="description"
                                            onChange={this.onChange}
                                        />
                                        <Button
                                            style={{ marginTop: '2rem' }}
                                        >
                                            Add Product
                                    </Button>
                                    </FormGroup>
                                </Form>
                            </Card>
                        </Col>
                    </Row>) : (<Alert color="danger">Only Admin is able to view this page</Alert>)}</Fragment>) : (<div></div>)}
                </Container>
            </div>
        )
    }
}

AddProduct.propTypes = {
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    product: state.product,
    authentication: state.authentication
})

export default connect(mapStateToProps, { addProduct })(AddProduct)
