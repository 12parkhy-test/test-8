import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/users/Signup'
import Login from './components/users/Login'
import NavigationBar from './components/NavigationBar'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import CartItemList from './components/CartItemList'
import OrderResult from './components/OrderResult'
import OrderHistory from './components/OrderHistory'
import OrderDetail from './components/OrderDetail'
import UserList from './components/users/UserList'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { getUser } from './actions/authActions'

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser())
  }
  
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <NavigationBar />
            <Route component={Home} exact path='/' />
            <Route component={ProductList} exact path='/products' />
            <Route component={AddProduct} path='/products/add' />
            <Route component={Signup} path='/users/signup' />
            <Route component={Login} path='/users/login' />
            <Route component={CartItemList} exact path='/cart' />
            <Route component={OrderResult} exact path='/orders' />
            <Route component={OrderHistory} path='/orders/history' />
            <Route component={UserList} path='/users' />
            {/* <Route component={OrderDetail} path='/orders/order/:id' /> */}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
