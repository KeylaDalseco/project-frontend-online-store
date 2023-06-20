import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    let cart = JSON.parse(localStorage.getItem('PRODUCT_CART')) || [];
    cart = cart.map((product) => ({ ...product, quantity: product.quantity || 1 }));
    this.setState({ cart });
  }

  handleIncreaseQuantity = (index) => {
    this.setState((prevState) => {
      const cart = [...prevState.cart];
      cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
      localStorage.setItem('PRODUCT_CART', JSON.stringify(cart));
      return { cart };
    });
  };

  handleDecreaseQuantity = (index) => {
    this.setState((prevState) => {
      const cart = [...prevState.cart];
      cart[index] = { ...cart[index], quantity: cart[index].quantity - 1 };
      localStorage.setItem('PRODUCT_CART', JSON.stringify(cart));
      return { cart };
    });
  };

  handleRemoveProduct = (index) => {
    this.setState((prevState) => {
      const cart = [...prevState.cart];
      cart.splice(index, 1);
      localStorage.setItem('PRODUCT_CART', JSON.stringify(cart));
      return { cart };
    });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {cart.map(({ title, image, thumbnail, price, quantity }, index) => (
          <div key={ index }>
            <p data-testid="shopping-cart-product-name">{title}</p>
            <div>
              <button
                data-testid="product-decrease-quantity"
                disabled={ quantity === 1 }
                onClick={ () => this.handleDecreaseQuantity(index) }
              >
                -
              </button>
              <span data-testid="shopping-cart-product-quantity">{quantity}</span>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => this.handleIncreaseQuantity(index) }
              >
                +
              </button>
            </div>
            <img src={ image || thumbnail } alt={ title } />
            <p>{`R$${price}`}</p>
            <button
              data-testid="remove-product"
              onClick={ () => this.handleRemoveProduct(index) }
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    );
  }
}
