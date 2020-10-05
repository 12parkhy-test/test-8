import React, { Component } from 'react'
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
    Navlink,
    Alert, Container
} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signup } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        msg: ''
    }

    componentDidUpdate(prevProps, nextProps) {
        const { error, isAuthenticated } = this.props
        if (error !== prevProps.error) {
            if (error.type === 'SIGNUP_FAIL') {

                this.setState({ msg: error.msg })
            }
            else {
                this.setState({ msg: '' })
            }
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signup(newUser)
    }

    render() {
        return (
            <Container>
                {this.props.isAuthenticated ? (<Redirect to="/users/login" />) : null}
                <Row>
                    <Col sm="6" className="m-auto">
                        <Card body>
                            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                            <h2>Sign Up</h2>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name"
                                        onChange={this.onChange}
                                    />
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        onChange={this.onChange}
                                    />
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                    <Button
                                        style={{ marginTop: '2rem' }}
                                    >
                                        Sign Up
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Signup.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { signup, clearErrors })(Signup)
