import React, { Component, Fragment } from 'react'
import { Container, Card, Button, CardTitle, CardText, Row, Col, Alert, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { getProducts, deleteProduct } from '../actions/productActions'
import { addToCart } from '../actions/orderActions'
import PropTypes from 'prop-types'

class ProductList extends Component {
    state = {
        quantity: 0,
        msg: ''
    }

    componentDidMount() {
        this.props.getProducts()
    }

    handleDeleteProduct = (id) => {
        this.props.deleteProduct(id)
    }

    handleAddToCart = (productInfo) => {
        if (parseInt(this.state.quantity) > 0) {
            productInfo['quantity'] = parseInt(this.state.quantity)
            this.props.addToCart(productInfo)
        }
        else {
            this.setState({msg: "Quantity must be at least 1"})
        }
        
    } 

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, msg: '' })
    }

    render() {
        const { products } = this.props.product
        const { isAuthenticated, user } = this.props.authentication
        return (
            <Container>
                {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                {user ? (<Fragment>{user.email == 'admin@test.com' ? (
                    <Row>
                        {products.map(({ _id, name, price, description }) => (
                            <Col key={_id} sm="6" style={{ marginBottom: "2rem" }}>
                                <Card body>
                                    <CardTitle>{name}</CardTitle>
                                    <CardText>${price}</CardText>
                                    <CardText>{description}</CardText>
                                    <Button color="danger"
                                        onClick={this.handleDeleteProduct.bind(this, _id)}>Remove</Button>

                                </Card>
                            </Col>
                        ))}
                    </Row>) : (<Row>
                        {products.map(({ _id, name, price, description }) => (
                            <Col key={_id} sm="6" style={{ marginBottom: "2rem" }}>
                                <Card body>
                                    <CardTitle>{name}</CardTitle>
                                    <CardText>${price}</CardText>
                                    <Label for="quantity">Quantity</Label>
                                    <Input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        min="1"
                                        onChange={this.onChange}
                                        style={{width:"3.5rem", margin: 'auto'}}
                                    />
                                    <CardText>{description}</CardText>
                                    <Button color="success"
                                        onClick={this.handleAddToCart.bind(this, { id: _id, name, price, description })}>Add To Cart</Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>)}</Fragment>) : (<div></div>)}

            </Container>
        )
    }
}

ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    product: state.product,
    authentication: state.authentication
})

export default connect(mapStateToProps, { getProducts, deleteProduct, addToCart })(ProductList)