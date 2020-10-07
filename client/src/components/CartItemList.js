import React, { Component, Fragment } from 'react'
import { Container, Table, Card, Button, CardTitle, Row, Col, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { getCartItems, deleteCartItem, orderItems, clearCart, checkout } from '../actions/orderActions'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import StripeCheckout from 'react-stripe-checkout'

class CartItemList extends Component {
    state = {
        tips: 0
    }
    componentDidMount() {
        this.props.getCartItems()
    }

    handleDeleteCartItem = (id) => {
        this.props.deleteCartItem(id)
    }

    // handlePay = (orderInfo) => {
    //     orderInfo.date = Date.now()
    //     orderInfo.tips = parseFloat(this.state.tips)
    //     orderInfo.total = parseFloat((orderInfo.subtotal + orderInfo.taxes + orderInfo.tips).toFixed(2))
    //     orderInfo.orderId = uuid()
    //     this.props.orderItems(orderInfo)
    //     this.props.clearCart()
    //     window.location.href = '/orders'
    // }

    onChange = (event) => {
        this.setState({ [event.target.name]: parseFloat(event.target.value) })
    }

    handleToken = (orderInfo, token) => {
        orderInfo.tips = parseFloat((this.state.tips).toFixed(2))
        orderInfo.subtotal = parseFloat((orderInfo.subtotal).toFixed(2))
        orderInfo.taxes = parseFloat((orderInfo.taxes).toFixed(2))
        orderInfo.total = parseFloat((orderInfo.subtotal + orderInfo.taxes + orderInfo.tips).toFixed(2))
        this.props.checkout(orderInfo, token)
    }

    render() {
        const { cartItems } = this.props.order
        const { isAuthenticated, user } = this.props.authentication

        let totals
        let subtotal
        let taxes
        if (cartItems.length != 0) {
            totals = cartItems.map((cartItem) => { return cartItem.productPrice * cartItem.productQuantity })
            subtotal = totals.reduce((a, b) => { return a + b }, 0)
            taxes = subtotal * 0.1
        }
        
        return (
            <Container>
                {cartItems.length != 0 ? (<Fragment>
                    <div class="table-responsive">
                        <Table style={{ marginBottom: "10rem" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(({ productId, productName, productPrice, productQuantity, productDescription }) => (
                                    
                                    <Fragment key={productId}>
                                        <tr>
                                            <td></td>
                                            <td>{productName}</td>
                                            <td>${productPrice}</td>
                                            <td>{productQuantity}</td>
                                            <td>${(productPrice * productQuantity).toFixed(2)}</td>
                                            <td><Button color="danger"
                                                onClick={this.handleDeleteCartItem.bind(this, productId)}>Remove</Button></td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Row>
                        <Col md="6" className="m-auto">
                            <Card body>
                                <CardTitle><div style={{ float: "left" }}>Subtotal</div><div style={{ float: "right" }}>${subtotal.toFixed(2)}</div></CardTitle>
                                <CardTitle><div style={{ float: "left" }}>Taxes</div><div style={{ float: "right" }}>${taxes.toFixed(2)}</div></CardTitle>
                                <CardTitle><div style={{ float: "left" }}>Tips</div><div style={{ float: "right" }}>${this.state.tips}</div></CardTitle>
                                <CardTitle><div style={{ float: "left" }}>Total</div><div style={{ float: "right" }}>${(subtotal + taxes + this.state.tips).toFixed(2)}</div></CardTitle>
                                {/* <CardTitle><Button color="info" style={{ width: "100%" }}
                                    onClick={this.handlePay.bind(this, { cartItems, subtotal, taxes })}>Pay</Button></CardTitle> */}
                                <CardTitle><StripeCheckout
                                 stripeKey="pk_test_51HD7H7GbsiPkKoEWGjyXFO3gDk6FzrizqBf7hkQ6o8XKW6bz0eOPKmF3qUjGFV4ksOt1ZuYePyxvW3RGsYmF41yU00EkOccneO" 
                                 token={this.handleToken.bind(this, { cartItems, subtotal, taxes })}
                                 billingAddress
                                 shippingAddress
                                 amount={((subtotal + taxes + this.state.tips).toFixed(2)) * 100}
                                 /></CardTitle>
                            </Card>
                            <div style={{ marginTop: "2.5rem", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Label for="tips" style={{ marginRight: "2.5rem" }}>Tips</Label>
                                <Input
                                    type="number"
                                    name="tips"
                                    id="tips"
                                    value={this.state.tips}
                                    min='0'
                                    step='0.01'
                                    style={{ width: "50%" }}
                                    onChange={this.onChange}
                                />
                            </div>
                        </Col>
                    </Row>
                </Fragment>) : (<div>
                    <h1>There is no items in a cart</h1>
                    <Link to="/products">Start Shopping!</Link>
                </div>)}
            </Container>
        )
    }
}

CartItemList.propTypes = {
    getCartItems: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    order: state.order,
    authentication: state.authentication
})

export default connect(mapStateToProps, { getCartItems, deleteCartItem, orderItems, clearCart, checkout })(CartItemList) 