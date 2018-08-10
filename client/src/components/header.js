import React from 'react';
import {Input} from './input';
import './header.css';
import { Link } from 'react-router-dom';
export const Header = (props) => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">E Commerce</a>

        <form className="form-inline my-2 my-lg-0">
          <Input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" change={props.handleSearch} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Products</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">Cart
              <strong><sup>{props.items}</sup></strong>
              </Link>
            </li>
          </ul>
          {props.isLogin ?
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {props.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Orders</a>
                  <a className="dropdown-item" href="#">Profile</a>
                  <a className="dropdown-item" href="#" onClick={props.handleLogout}>Log Out</a>
                </div>
              </li>
            </ul> : <Link to="/">Log In</Link>}
        </div>
      </nav>
    </div>
  );
}