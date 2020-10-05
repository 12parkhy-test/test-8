import React, { Component, Fragment } from 'react'
import { Container, Table, Card, Button, CardTitle, Row, Col, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { getCartItems, deleteCartItem, orderItems, clearCart } from '../actions/orderActions'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

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

    handlePay = (orderInfo) => {
        orderInfo.date = Date.now()
        orderInfo.tips = parseFloat(this.state.tips)
        orderInfo.total = parseFloat((orderInfo.subtotal + orderInfo.taxes + orderInfo.tips).toFixed(2))
        orderInfo.orderId = uuid()
        this.props.orderItems(orderInfo)
        this.props.clearCart()
        window.location.href = '/orders'
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: parseFloat(event.target.value) })
    }

    render() {
        const { cartItems } = this.props.order
        const { isAuthenticated, user } = this.props.authentication
        let totals = cartItems.map((cartItem) => { return cartItem.productPrice * cartItem.productQuantity })
        let subtotal = totals.reduce((a, b) => { return a + b }, 0)
        let taxes = subtotal * 0.1
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
                                            <td>${productPrice * productQuantity}</td>
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
                                <CardTitle><text style={{ float: "left" }}>Subtotal</text><text style={{ float: "right" }}>${subtotal}</text></CardTitle>
                                <CardTitle><text style={{ float: "left" }}>Taxes</text><text style={{ float: "right" }}>${taxes}</text></CardTitle>
                                <CardTitle><text style={{ float: "left" }}>Tips</text><text style={{ float: "right" }}>${this.state.tips}</text></CardTitle>
                                <CardTitle><text style={{ float: "left" }}>Total</text><text style={{ float: "right" }}>${(subtotal + taxes + this.state.tips).toFixed(2)}</text></CardTitle>
                                <CardTitle><Button color="info" style={{ width: "100%" }}
                                    onClick={this.handlePay.bind(this, { cartItems, subtotal, taxes })}>Pay</Button></CardTitle>
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

export default connect(mapStateToProps, { getCartItems, deleteCartItem, orderItems, clearCart })(CartItemList) 