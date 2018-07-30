import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/loginAction';
import { setEmail } from '../redux/actions/loginAction';
import { setPassword } from '../redux/actions/loginAction';
import { Input } from '../components/input';
import {Button} from '../components/button';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }
 
  handleEmailChange(e){
    console.log(e.target.value);
    this.props.setEmailValue(e.target.value);
  }

  handlePasswordChange(e){
    this.props.setPassword(e.target.value);
  }
  
  handleLogIn(){
    this.props.loginMethod(this.props.email,this.props.password);
  }
  render() {
    return (
      <div>
        <Input placeholder='Email' change={this.handleEmailChange}/>
        <Input placeholder='Password' change={this.handlePasswordChange}/>
        <Button name='Sign In' click={this.handleLogIn}/>
        <Button name='Sign Up '/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email : state.email,
    password: state.password
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginMethod: (email,password) => {
      dispatch(login(email,password));
    },

    setEmailValue : (email) =>{
      dispatch(setEmail(email));
    },

    setPassword : (password) =>{
      dispatch(setPassword(password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);    