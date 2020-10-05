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
    NavLink,
    Alert,
    Row,
    Col,
    Card, Container
} from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: ''
    }

    componentDidUpdate(prevProps, nextProps) {
        const { error, isAuthenticated } = this.props
        if (error !== prevProps.error) {
            if (error.type === 'LOGIN_FAIL') {
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
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(user)
    }

    render() {
        return (
            <Container>
                {this.props.isAuthenticated ? (<Redirect to="/" />) : null}
                <Row>
                    <Col sm="6" className="m-auto">
                        <Card body>
                            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                            <h2>Log In</h2>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
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
                                        Log In
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

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login)
