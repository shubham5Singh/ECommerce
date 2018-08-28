import React from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';

export const RegistrationComponent = (props) => {
  return (
    <div className="container">
      <div className="row"><h2>Registration Page</h2></div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First Name</label>
            <Input
              type="text"
              className="form-control"
              placeholder="First Name"
              change={(e) => props.handleFirstName(e)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Last Name</label>
            <Input
              type="text"
              className="form-control"
              placeholder="Last Name"
              change={(e) => props.handleLastName(e)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Password</label>
            <Input
              type="password"
              className="form-control"
              placeholder="Password"
              change={(e) => props.handlePassword(e)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Confirm Password</label>
            <Input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              change={(e) => props.handleConfirmPassword(e)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <Input
              type="email"
              className="form-control"
              placeholder="Email"
              change={(e) => props.handleEmail(e)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Phone</label>
            <Input
              type="number"
              className="form-control"
              placeholder="Phone"
              change={(e) => props.handlePhone(e)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <Button 
            class="btn btn-primary"
            name="Sign Up"
            click={props.submitRegistration}
            />
          </div>
        </div>
      </form>
    </div>
  )
}