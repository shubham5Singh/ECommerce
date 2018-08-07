import React, { Component } from 'react';
import Login from './containers/login';
import Home from './containers/home';
import Register from './containers/register';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Login} />
					<Route exact path='/Register' component={Register} />
					<Route exact path='/Home' component={Home} />
				</div>
			</Router>
		);
	}
}

export default App;
