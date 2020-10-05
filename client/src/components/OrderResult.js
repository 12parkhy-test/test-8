import React, { Component, Fragment } from 'react'
import { Container, Table, Card, CardTitle, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { getOrderResult } from '../actions/orderActions'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class OrderResult extends Component {
    componentDidMount() {
        this.props.getOrderResult()
    }

    render() {
        const { orderResult } = this.props.order
        const { isAuthenticated, user } = this.props.authentication

        return (
            <Container>
                {Object.keys(orderResult).length != 0 ? (<Fragment>
                    <div style={{ textAlign: 'left', marginBottom: "2rem" }}>
                        <p>Order Date: {orderResult.date}</p>
                        <p>Order ID: {orderResult.orderId}</p>
                    </div>
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
                                {orderResult.orderItems.map(({ productId, productName, productPrice, productQuantity, productDescription }) => (
                                    <Fragment key={productId}>
                                        <tr>
                                            <td></td>
                                            <td>{productName}</td>
                                            <td>${productPrice}</td>
                                            <td>{productQuantity}</td>
                                            <td>${productPrice * productQuantity}</td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Row>
                        <Col md="6" className="m-auto">
                            <Card body>
                                <CardTitle><div style={{ float: "left" }}>Subtotal</div><div style={{ float: "right" }}>${orderResult.subtotal}</div></CardTitle>
                                <CardTitle><div style={{ float: "left" }}>Taxes</div><div style={{ float: "right" }}>${orderResult.taxes}</div></CardTitle>
                                <CardTitle><div style={{ float: "left" }}>Tips</div><div style={{ float: "right" }}>${orderResult.tips}</div></CardTitle>
                                <CardTitle><div style={{ float: "left" }}>Total</div><div style={{ float: "right" }}>${(orderResult.subtotal + orderResult.taxes + orderResult.tips).toFixed(2)}</div></CardTitle>
                            </Card>
                        </Col>
                    </Row>
                </Fragment>) : (<div></div>)}
            </Container>
        )
    }
}

OrderResult.propTypes = {
    getOrderResult: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    order: state.order,
    authentication: state.authentication
})

export default connect(mapStateToProps, { getOrderResult })(OrderResult) 