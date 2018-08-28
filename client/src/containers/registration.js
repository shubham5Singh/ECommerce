import React from 'react';
import { connect } from 'react-redux';
import { RegistrationComponent } from '../components/registrationComponent';
import { registration } from '../redux/actions/loginAction';
import swal from 'sweetalert2';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    const user = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      Phone: ''
    };
    this.state = { validPassword: false };
  }

  handleFirstName(e) {
    this.user = {
      ...this.user,
      FirstName: e.target.value
    }
  }

  handleLastName(e) {
    this.user = {
      ...this.user,
      LastName: e.target.value
    }
  }

  handlePassword(e) {
    this.setState({
      validPassword: false
    });
    this.user = {
      ...this.user,
      Password: e.target.value
    }
  }

  handleConfirmPassword(e) {
    this.setState({
      validPassword: false
    });
    if (this.user.Password === e.target.value) {
      this.setState({
        validPassword: true
      });
    }
  }

  handleEmail(e) {
    this.user = {
      ...this.user,
      Email: e.target.value
    }
  }

  handlePhone(e) {
    this.user = {
      ...this.user,
      Phone: e.target.value
    }
  }

  submitRegistration() {
    if (this.state.validPassword) {
      this.props.registration(this.user, this.props.history);
    }
    else{
      swal({
        title: 'Error!',
        text: 'Password and Confirm Password is not matched',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  render() {
    return (
      <RegistrationComponent
        handleFirstName={(e) => this.handleFirstName(e)}
        handleLastName={(e) => this.handleLastName(e)}
        handleEmail={(e) => this.handleEmail(e)}
        handlePhone={(e) => this.handlePhone(e)}
        handlePassword={(e) => this.handlePassword(e)}
        handleConfirmPassword={(e) => this.handleConfirmPassword(e)}
        submitRegistration={this.submitRegistration}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    login: state.login
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    registration: (user, history) => {
      dispatch(registration(user, history));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);