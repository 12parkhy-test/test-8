// import React, { Component, Fragment } from 'react'
// import { Container, Table, Card, CardTitle, Row, Col, Button } from 'reactstrap'
// import { connect } from 'react-redux'
// import { getOrderDetail } from '../actions/orderActions'
// import PropTypes from 'prop-types'
// import { Redirect } from 'react-router-dom'

// class OrderDetail extends Component {
//     componentDidMount() {
//         this.props.getOrderDetail()
//     }

//     render() {
//         const { orderDetail } = this.props.order
//         console.log(this.props.order)
//         // const { isAuthenticated, user } = this.props.authentication
//         return (
//             <Container>
//                 <div>
//                     HELLLO
//                 </div>
//                 {/* {orderHistory.length != 0 ? (<Fragment>
//                     <div class="table-responsive">
//                         <Table style={{ marginBottom: "5rem" }}>
//                             <thead>
//                                 <tr>
//                                     <th></th>
//                                     <th>Order ID</th>
//                                     <th>Total</th>
//                                     <th>Date</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {orderHistory.map((order) => (
//                                     <Fragment key={order.orderId}>
//                                         <tr>
//                                             <td></td>
//                                             <td>{order.orderId}</td>
//                                             <td>${order.total}</td>
//                                             <td>{order.date}</td>
//                                             <td><Button color="info"
//                                             onClick={this.handleDetails.bind(this, order.orderId)}>Details</Button></td>
//                                         </tr>
//                                     </Fragment>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </div>
//                 </Fragment>) : (<div></div>)} */}
//             </Container>
//         )
//     }
// }

// OrderDetail.propTypes = {
//     getOrderDetail: PropTypes.func.isRequired,
//     order: PropTypes.object.isRequired,
//     authentication: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     order: state.order,
//     authentication: state.authentication
// })

// export default connect(mapStateToProps, { getOrderDetail })(OrderDetail) 