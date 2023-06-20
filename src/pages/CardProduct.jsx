import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProduct } from '../services/localstorage';
import '../App.css';

export default class CardProduct extends Component {
  state = {};

  componentDidMount() {
    this.saveCart();
  }

  saveCart = async (info) => {
    await addProduct(info);
  };

  render() {
    const { title, image, price, id } = this.props;
    return (
      <div className="card" data-testid="product">
        <Link
          key={ id }
          to={ `/details-product/${id}` }
          data-testid="product-detail-link"
        >
          <h2 className="product-name">{ title }</h2>
        </Link>
        <img className="product-img" src={ image } alt={ title } />
        <div className="price">
          <p className="product-price">R$</p>
          <p className="product-price">{ price }</p>
        </div>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => {
            this.saveCart({ title,
              image,
              price,
              id });
          } }
        >
          Adicionar ao carrinho
        </button>

      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
