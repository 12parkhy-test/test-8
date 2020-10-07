import React, { Component, Fragment } from 'react'
import { Container, Table, Card, CardTitle, Row, Col, Button, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { getOrderHistory, getOrderDetail } from '../actions/orderActions'
import { clearErrors } from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class OrderHistory extends Component {
    state = {
        modal: false,
        orderInfo: {},
        orderItems: [],
        msg: ''
    }

    componentDidMount() {
        this.props.getOrderHistory()
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleDetails = (orderInfo) => {
        this.setState({
            orderInfo: orderInfo,
            orderItems: orderInfo.orderItems
        })
        this.toggle()
    }

    render() {
        const { orderHistory } = this.props.order
        const { isAuthenticated, user } = this.props.authentication
        
        let totals
        let sumTotals
        if (orderHistory.length != 0) {
            totals = orderHistory.map((order) => { return order.total })
            sumTotals = parseFloat((totals.reduce((a, b) => { return a + b }, 0)).toFixed(2))
            sumTotals = sumTotals.toLocaleString()
        }

        return (
            <Container>
                {orderHistory.length != 0 ? (<Fragment>
                    <h3>Total amount paid: ${sumTotals}</h3>
                    <div class="table-responsive">
                        <Table style={{ marginBottom: "5rem", marginTop: "1.5rem" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Order ID</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderHistory.map((order) => (
                                    <Fragment key={order.orderId}>
                                        <tr>
                                            <td></td>
                                            <td>{order.orderId}</td>
                                            <td>${(order.total).toFixed(2)}</td>
                                            <td>{order.date}</td>
                                            <td><Button color="info"
                                                onClick={this.handleDetails.bind(this, order)}>Details</Button></td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Fragment>) : (<div></div>)}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Order Detail
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <p>Order Date: {this.state.orderInfo.date}</p>
                        <p>Order ID: {this.state.orderInfo.orderId}</p>
                        <div class="table-responsive">
                            <Table style={{ marginBottom: "5rem" }}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.orderItems.map(({ productId, productName, productPrice, productQuantity, productDescription }) => (
                                        <Fragment key={productId}>
                                            <tr>
                                                <td></td>
                                                <td>{productName}</td>
                                                <td>${productPrice}</td>
                                                <td>{productQuantity}</td>
                                                <td>${(productPrice * productQuantity).toFixed(2)}</td>
                                            </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <Row>
                            <Col md="6" className="m-auto">
                                <Card body>
                                    <CardTitle><div style={{ float: "left" }}>Subtotal</div><div style={{ float: "right" }}>${this.state.orderInfo.subtotal}</div></CardTitle>
                                    <CardTitle><div style={{ float: "left" }}>Taxes</div><div style={{ float: "right" }}>${this.state.orderInfo.taxes}</div></CardTitle>
                                    <CardTitle><div style={{ float: "left" }}>Tips</div><div style={{ float: "right" }}>${this.state.orderInfo.tips}</div></CardTitle>
                                    <CardTitle><div style={{ float: "left" }}>Total</div><div style={{ float: "right" }}>${(this.state.orderInfo.total + 0).toFixed(2)}</div></CardTitle>
                                </Card>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Container>
        )
    }
}

OrderHistory.propTypes = {
    getOrderHistory: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    order: state.order,
    authentication: state.authentication,
    error: state.error
})

export default connect(mapStateToProps, { getOrderHistory, getOrderDetail, clearErrors })(OrderHistory) 