import React from 'react';
import './header.css';
export const Header = (props) => {
  return (
    
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">E Commerce</li>
            <li><a href="#0">Products</a></li>
            <li><a href="#0">Carts</a></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><input type="search" placeholder="Search" /></li>
            <li><button type="button" className="button">Search</button></li>
          </ul>
        </div>
      </div>
    
  );
}