import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/loginAction';
import { setEmail } from '../redux/actions/loginAction';
import { setPassword } from '../redux/actions/loginAction';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { withRouter } from 'react-router-dom';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.state = { signInClick: false};
  }

  handleEmailChange(e) {
    this.props.setEmailValue(e.target.value);
    this.setState({
      signInClick:false
    });
  }

  handlePasswordChange(e) {
    this.props.setPassword(e.target.value);
    this.setState({
      signInClick:false
    });
  }

  handleLogIn() {
    this.props.loginMethod(this.props.email, this.props.password,this.props.history);
    this.setState({
      signInClick:true
    });
  }
  render() {
    return (
      <div className="grid-container login">
        <div className="grid-x grid-margin-x">
          <div className="cell small-6 large-4 large-offset-4 small-offset-2"><h1>Log In</h1></div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell small-6 large-4 large-offset-4 small-offset-2"> <Input placeholder='Email' type='email' change={this.handleEmailChange} /></div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell small-6 large-4 large-offset-4 small-offset-2"><Input placeholder='Password' type='password' change={this.handlePasswordChange} /></div>
        </div>
        <div className="grid-x grid-margin-x login__error">
         <div className="cell small-6 large-4 large-offset-4 small-offset-2 login__error--message">{this.state.signInClick ? (this.props.islogin ? '' : '**Email or Password is wrong'):'' }</div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell large-offset-4 small-offset-2 shrink"> <Button name='Sign In' click={this.handleLogIn} /></div>
          <div className="cell shrink"> <Button name='Sign Up ' /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    islogin: state.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginMethod: (email, password,history) => {
      dispatch(login(email, password,history));
    },

    setEmailValue: (email) => {
      dispatch(setEmail(email));
    },

    setPassword: (password) => {
      dispatch(setPassword(password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));    