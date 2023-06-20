import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListaProdutos from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import DetailsProduct from './pages/DetailsProduct';
// import { getCategories,
//   getProductById,
//   getProductsFromCategoryAndQuery } from './services/api';

export default class App extends Component {
  render() {
    // getCategories();
    // getProductsFromCategoryAndQuery('MLB271599', 'Agro');
    // getProductById('MLB5672');
    return (
      <main>

        <Switch>
          <Route exact path="/" component={ ListaProdutos } />
          <Route path="/shoppingcart" component={ ShoppingCart } />
          <Route path="/details-product/:id" component={ DetailsProduct } />
        </Switch>
      </main>
    );
  }
}
