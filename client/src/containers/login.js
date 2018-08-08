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
    this.state = { signInClick: false };
  }

  handleEmailChange(e) {
    this.props.setEmailValue(e.target.value);
    this.setState({
      signInClick: false
    });
  }

  handlePasswordChange(e) {
    this.props.setPassword(e.target.value);
    this.setState({
      signInClick: false
    });
  }

  handleLogIn() {
    this.props.loginMethod(this.props.login.email, this.props.login.password, this.props.history);
    this.setState({
      signInClick: true
    });
  }
  render() {
    return (
      <div className="container login">
        <div className="row vertical-offset-100">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please Log in</h3>
              </div>
              <div className="panel-body">
                <form acceptCharset="UTF-8" role="form">
                  <fieldset>
                    <div className="form-group">
                      <Input className="form-control" placeholder="E-mail" change={this.handleEmailChange} type="email" />
                    </div>
                    <div className="form-group">
                      <Input className="form-control" placeholder="Password" type="password" change={this.handlePasswordChange} />
                    </div>
                    <div className="login__error--message">{this.state.signInClick ? (this.props.login.islogin ? '' : '**Email or Password is wrong'):'' }</div>
                    <div className="row">
                    <div className="col-lg-2 col-sm-4"> <Button name='Sign In' click={this.handleLogIn} /></div>
                    <div className="offset-1 col-lg-2 col-sm-4"> <Button name='Sign Up ' /></div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginMethod: (email, password, history) => {
      dispatch(login(email, password, history));
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