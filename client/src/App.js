import React, { Component } from 'react';
import Login from './containers/login';
import Home from './containers/home';
import Cart from './containers/cart';
import ProductDescription from './containers/productDescription';
import Checkout from './containers/checkout';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Login} />
					<Route exact path='/Cart' component={Cart} />
					<Route exact path='/Home' component={Home} />
					<Route exact path='/Address' component={Checkout} />
					<Route exact path='/ProductDeatil/:value' component={ProductDescription} />
				</div>
			</Router>
		);
	}
}

export default App;
