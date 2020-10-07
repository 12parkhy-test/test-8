import React, { Component, Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Alert,
    Badge
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './users/Logout'

class NavigationBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.authentication
        // let cartItems
        // let parsedCartItems
        // if (user) {
        //     cartItems = user.cartItems    
        //     parsedCartItems = JSON.stringify(cartItems)
        //     console.log(parsedCartItems)
        // }
        
        const loggedIn = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Hello, ${user.name}!` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="/products">
                        Start Shopping
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/cart">
                        Cart 
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/orders/history">
                        Order History
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
        const adminLoggedIn = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Hello, ${user.name}!` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="/products/add">
                        Add Products
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/products">
                        View Products
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/users">
                        View Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
        const notLoggedIn = (
            <Fragment>
                <NavItem>
                    <NavLink href="/users/signup">
                        Sign Up
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/users/login">
                        Log In
                    </NavLink>
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar dark expand="md" className="mb-5" style={{ backgroundColor: '#783dbf' }}>
                    <Container>
                        <NavbarBrand href="/">J-Mart</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            {user ? (<Fragment>{user.email == 'admin@test.com' ? (adminLoggedIn) : (loggedIn)}</Fragment>) : notLoggedIn}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

NavigationBar.propTypes = {
    authentication: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authentication: state.authentication
})

export default connect(mapStateToProps, {})(NavigationBar)
