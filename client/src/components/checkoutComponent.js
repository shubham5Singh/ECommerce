import React from 'react';
import './checkoutComponent.css';

export const CheckoutComponent = (props) => {
  return (
    <div className="container-fuild">
      <div className="row heading">
        <div className="col-md-6 offset-2">
          <h2>Payment Breakdown</h2>
        </div>
      </div>
      <div>
        {props.products.map((product, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-md-4 offset-2"><b>{product.ProductName}</b></div>
              <div className="col-md-4">{product.UnitPrice}&#36;</div>
            </div>
          )
        })}
      </div>
      <div className="row">
        <div className="col-md-4 offset-2">Total:</div>
        <div className="col-md-4">
          <del>{props.total}</del>&#36;
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-2">Save:</div>
        <div className="col-md-4">
          {props.save}&#36;
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-2">Net Price:</div>
        <div className="col-md-4">
          {props.total - props.save}&#36;
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-2">Delevery Charges:</div>
        <div className="col-md-4">
          {props.total > 500 ? 'Free' : 50}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-2">Payable Price:</div>
        <div className="col-md-4">
          <b>{props.total > 500 ? props.total - props.save : props.total - props.save + 50}&#36;</b>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-4"><button className="btn btn-primary">Pay &#x27A4;</button></div>
      </div>
    </div>

  );
}