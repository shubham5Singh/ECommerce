import React from 'react';
import './products.css';
import { Link } from 'react-router-dom';
import { Button } from './button';
export const Product = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.products.map((product, index) => {
          if (product) {
            return (
              <div className="col-sm-6 col-md-4" key={index}>
                <div className="thumbnail" >
                  <img className="card-img-top" src={window.location.origin +'/images/'+ product.image} alt={product.image} />
                  <div className="caption">
                    <div className="row">
                      <div className="col-md-6 col-xs-6">
                        <h3>{product.ProductName}</h3>
                      </div>
                      <div className="col-md-6 col-xs-6 price">
                        <h4>
                          <del><small className="price-del">{product.UnitPrice}</small></del>
                          <label> &#36;{product.UnitPrice - product.Discount}</label></h4>
                      </div>
                    </div>
                    <p>{product.ProductDescription}</p>
                    <div className="row">
                      <div className="col-md-6">
                        <Button class="btn btn-primary btn-product" name=" Quick View" click={e => props.handleView(product.ProductId)} />
                      </div>
                      <div className="col-md-6">
                        <Button class="btn btn-success btn-product" name="Add to cart" click={e => props.handleAddToCart(product)} />
                      </div>
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
    </div>
  );
}