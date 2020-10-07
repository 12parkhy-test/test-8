import React, { Component, Fragment } from 'react'
import { Container, Table, Button, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/authActions'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'

class UserList extends Component {
    state = {
        modal: false,
        orderHistory: '',
        sumTotals: ''
    }

    componentDidMount() {
        this.props.getUsers()
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        if (typeof this.state.orderHistory != 'string') {
            this.setState({
                orderHistory: ''
            })
        }
    }

    handleDetails = (userInfo) => {
        if (userInfo.orderHistory) {
            console.log('YES')
            let temp = JSON.parse(userInfo.orderHistory)
            temp.sort((a, b) => {
                if (a.date < b.date) {
                    return 1
                }
                else if (a.date > b.date) {
                    return -1
                }
                else {
                    return 0
                }
            })
            let sumTotals = 0
            for (let i = 0; i < temp.length; i++) {
                sumTotals = sumTotals + temp[i].total
                temp[i].date = new Date(temp[i].date).toString()
            }

            this.setState({
                orderHistory: temp,
                sumTotals: sumTotals.toLocaleString()
            })
            this.toggle()
        }
        else {
            console.log('NO')
            this.setState({
                orderHistory: [{orderId: "", total: 0, date: ""}],
                sumTotals: 0
            })
            this.toggle()
        }
    }

    render() {
        const { users } = this.props.authentication
        const { isAuthenticated, user } = this.props.authentication
        return (
            <Container>
                {users.length != 0 ? (<Fragment>
                    <div class="table-responsive">
                        <Table style={{ marginBottom: "10rem" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <Fragment key={user._id}>
                                        <tr>
                                            <td></td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.date}</td>
                                            <td>{user.email != 'admin@test.com' ? (<Button color="info"
                                                onClick={this.handleDetails.bind(this, user)}>Details</Button>) : (<Fragment></Fragment>)}</td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Fragment>) : (<div>
                </div>)}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        User Detail
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <h3>Total amount paid: ${this.state.sumTotals}</h3>
                        <div class="table-responsive">
                            <Table style={{ marginBottom: "5rem" }}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {typeof this.state.orderHistory != 'string' ? (this.state.orderHistory.map(({ orderId, date, total, orderItems }) => (
                                        <Fragment key={orderId}>
                                            <tr>
                                                <td>{orderId}</td>
                                                <td>${total.toLocaleString()}</td>
                                                <td>{date}</td>
                                                <td></td>
                                            </tr>
                                        </Fragment>
                                    ))) : (<tr></tr>)}
                                </tbody>
                            </Table>
                        </div>
                    </ModalBody>
                </Modal>
            </Container>
        )
    }
}

UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    order: state.order,
    authentication: state.authentication
})

export default connect(mapStateToProps, { getUsers })(UserList) 