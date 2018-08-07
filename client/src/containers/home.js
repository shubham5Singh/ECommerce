import React from 'react';
import { Header } from '../components/header';
import { Product } from '../components/products';
class Home extends React.Component{
  render(){
    return(
      <div>
      <Header/>
      <Product/>  
      </div>
    );
  }
}

export default Home;