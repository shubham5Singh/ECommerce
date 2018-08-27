import React from 'react';
import {Input} from '../components/input';
import {Button} from '../components/button';
import './checkoutComponent.css';

export const AddressComponent = (props) => {
  return (
    <div className="container">
      <div className="row"><strong><h2>Shipping Address</h2></strong></div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First Name</label>
            <Input 
            type="text" 
            className="form-control" 
            placeholder="First Name" 
            defaultValue={props.user.FirstName} 
            disable='true'
            />
          </div>
          <div className="form-group col-md-6">
            <label>Last Name</label>
            <Input 
            type="text" 
            className="form-control" 
            placeholder="Last Name" 
            defaultValue={props.user.LastName} 
            disable='true'
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
            defaultValue={props.user.Email} 
            disable='true'
            />
          </div>
          <div className="form-group col-md-6">
            <label>Phone</label>
            <Input 
            type="number" 
            className="form-control" 
            placeholder="Phone" 
            defaultValue={props.user.Phone} 
            disable='true'
            />
          </div>

        </div>
        <div className="form-group">
          <label>Address </label>
          <Input 
          type="text" 
          className="form-control"
          change={(e) =>props.handleAddress(e)}
           />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>City</label>
            <Input 
            type="text" 
            className="form-control"
            change={(e) =>props.handleCity(e)}
            />
          </div>
          <div className="form-group col-md-4">
            <label>State</label>
            <Input 
            type="text" 
            className="form-control"
            change={(e) =>props.handleState(e)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Zip</label>
            <Input 
            type="text" 
            className="form-control" 
            change={(e) =>props.handlePinCode(e)}
            />
          </div>
        </div>
        <Button  
        class="btn btn-primary" 
        name="Checkout"
        click={props.submitAddress}
        />
      </form>
    </div>
  );
}