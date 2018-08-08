import React from 'react';
import './products.css';
import { Button } from './button';
export const Product = (props) => {
  return (
    <div className="row">
      {props.products.map((product, index) => {
        if (product) {
          return (
            <div className="col-lg-3 col-sm-6" key={index}>
              <div className="card">
                <img className="card-img-top" src={window.location.origin + '/images/Penguins.jpg'} alt="Penguins" />
                <div className="card-body">
                  <h5 className="card-title">{product.ProductName}- {product.UnitPrice} </h5>
                  <p className="card-text">{product.ProductDescription}</p>
                  <div className="row">
                    <div className="col-lg-2 col-sm-4"><Button name="Add to cart" click={props.handleAddToCart} /></div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        else {
          return (
            <div key={index}>No data avialble now</div>
          );
        }
      })}
    </div>
  );
}