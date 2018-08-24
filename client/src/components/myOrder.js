import React from 'react';
import Moment from 'react-moment';

export const OrderComponent = (props) => {
  return (
    <div className="container">
      <div>
        {props.orders.map((item, index) => {
          return (
            <div key={index}>
              <div className='row btn btn-primary btn-sm btn-block'>
                ID: <strong> {item.OrderId}</strong>
              </div>
              <div className="row">
                <div className="col-md-2"><img className="img-thumbnail img-responsive" src={window.location.origin + '/images/' + item.image} alt={item.image} />
                </div>
                <div className="col-md-4">
                  <h4 className="product-name"><strong>{item.ProductName}</strong></h4><h4><small>{item.ProductDescription}</small></h4>
                  <span>Color: {item.Color}</span><br />
                  <span>Size: {item.Size}</span><br />
                  <span>Order Date: <Moment format="YYYY/MM/DD" date={item.OrderDate} /></span>
                </div>
                <div className="col-md-2">
                  <h6><strong> &#36;{item.Total}</strong></h6>
                  <span><del>&#36;{item.Price}</del></span>
                </div>
                <div className="col-md-2">
                  Quantity:<strong>{item.Quantity}</strong>
                </div>
                <div className="col-md-2">
                  Status:<strong>{item.Status}</strong>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        {props.orders.length > 0 ? '' : <h1>No Order Found</h1>}
      </div>
    </div>
  );
}