import React from 'react';
import './productDescriptionComponent';
import { Button } from './button';
export const ProductView = (props) => {
  return (
    <div className="container">
      <div className="card">
        <div className="container-fliud">
          <div className="row">
            <div className="col-md-6">
              <img className="img-thumbnail" src={window.location.origin + '/images/' + props.product.image} alt={props.product.image} />
            </div>
            <div className="col-md-6">
              <h3><strong>{props.product.ProductName}</strong></h3>
              <p>{props.product.ProductDescription}</p>
              <h4><strong>Current price:</strong> <span className="price">&#36;{props.product.UnitPrice - props.product.Discount}</span></h4>
              <p>You save: &#36;{props.product.Discount}</p>
              <h5>Size: {props.product.AvailableSize}</h5>
              <h5>Color: {props.product.Color}</h5>
              <Button class="btn btn-success" name="Add to cart  " click={e => props.handleAddtoCart(props.product)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}