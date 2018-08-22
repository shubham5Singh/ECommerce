import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    let searchValue = [];
    this.handleSearch = this.handleSearch.bind(this);
    this.productDescription = this.productDescription.bind(this);
    this.state = {
      inputSearch: false,
    };
  }

  productDescription(value) {
    this.props.products.filter((product) => {
      if (product.ProductName.toLowerCase().includes((value).toLowerCase())) {
        this.props.history.push('/ProductDeatil/' + product.ProductId);
      }
    })

  }

  handleSearch(e) {
    this.searchValue = [];
    this.setState({
      inputSearch: true
    });
    if (e.target.value === '') {
      this.searchValue = [];
    }
    else {
      this.props.products.filter((product) => {
        if (product.ProductName.toLowerCase().includes((e.target.value).toLowerCase())) {
          this.searchValue = [...this.searchValue, product.ProductName];
        }
      });
    }

  }
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link className="navbar-brand" to="/Home">E Commerce</Link>
          <form className="form-inline my-2 my-lg-0">
            <div className="dropdown">
              <input type="text" className="form-control mr-sm-2 dropdown-toggle" placeholder="Search" data-toggle="dropdown" onChange={this.handleSearch} />
              <div className="dropdown-menu">
                {this.state.inputSearch ? this.searchValue.map((value, index) => {
                  return <a className="dropdown-item" onClick={e => this.productDescription(value)}
                    key={index}>{value}</a>
                }) : ''
                }
              </div>
            </div>
          </form>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Home">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">Cart
                <strong><sup>{this.props.items}</sup></strong>
                </Link>
              </li>
            </ul>
            {this.props.isLogin ?
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.name}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/MyOrders">Orders</Link>
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#" onClick={this.props.handleLogout}>Log Out</a>
                  </div>
                </li>
              </ul> : <Link to="/">Log In</Link>}
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);

