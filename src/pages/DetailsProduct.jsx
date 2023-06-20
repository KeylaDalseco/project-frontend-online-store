import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProduct } from '../services/api';
import { addProduct } from '../services/localstorage';

export default class DetailsProduct extends Component {
  state = {
    productDetails: {},
    Checked: true,
    email: '',
    text: '',
    rating: '0',
    rec: [],
    valid: false,
  };

  async componentDidMount() {
    await this.getDetailsProduct();
  }

  getDetailsProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const productDetails = await getProduct(id);
    this.setState({
      productDetails,
    });
  };

  addCartShop = async (infos) => {
    await addProduct(infos);
  };

  buttonValidation = () => {
    const { email, rating } = this.state;
    const emailValid = email.length > 1 && email.includes('@');
    const ratingValid = rating >= 1;
    this.setState({ valid: !(emailValid && ratingValid) });
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  };

  submitButton = async () => {
    const { match: { params: { id } } } = this.props;
    const { email, text, rating, rec } = this.state;
    console.log(rec);

    // não esta sendo usaod pois a função de validação foi feita
    // if (email === '' || rating === '0') return;
    // this.setState({
    //   clicked: true,
    // });

    const oldRec = JSON.parse(localStorage.getItem(id));
    if (oldRec) {
      this.setState({
        rec: [...oldRec, { email, text, rating }],
      }, () => {
        const { rec: newRec } = this.state;
        localStorage
          .setItem(id, JSON.stringify(newRec));
      });
    } else {
      this.setState({
        rec: [{ email, text, rating }],
      }, () => {
        const { rec: newRec } = this.state;
        localStorage
          .setItem(id, JSON.stringify(newRec));
      });
      this.setState({
        email: '',
        message: '',
        rating: '0',
        checked: false,
      });
    }
  };

  render() {
    const { history } = this.props;
    const { productDetails: { title, price, thumbnail } } = this.state;
    const { Checked, email, text, rating, rec, valid } = this.state;
    console.log(rec);
    console.log(Checked);
    console.log(rating);
    const number3 = 3;
    const number4 = 4;
    const number5 = 5;

    return (
      <div>
        <h2>Detalhes do Produto</h2>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{price}</p>

        <button
          data-testid="shopping-cart-button"
          onClick={ () => { history.push('/shoppingcart', this.state); } }
        >
          Ir para o carrinho de compras

        </button>

        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            this.addCartShop({ title,
              price,
              thumbnail });
          } }
        >
          Adicionar ao carrinho
        </button>

        <div>
          <div>
            <h1>Avaliações</h1>
            <input
              name="email"
              type="email"
              data-testid="product-detail-email"
              required
              onChange={ this.inputChange }
            />
            <input
              name="rating"
              id="star-1"
              value="1"
              type="radio"
              data-testid={ `${1}-rating` }
              onChange={ this.inputChange }
            />
            <input
              name="rating"
              id="star-2"
              value="2"
              type="radio"
              data-testid={ `${2}-rating` }
              onChange={ this.inputChange }
            />
            <input
              name="rating"
              id="star-3"
              value="3"
              type="radio"
              data-testid={ `${number3}-rating` }
              onChange={ this.inputChange }
            />
            <input
              name="rating"
              id="star-4"
              value="4"
              type="radio"
              data-testid={ `${number4}-rating` }
              onChange={ this.inputChange }
            />
            <input
              name="rating"
              id="star-5"
              value="5"
              type="radio"
              data-testid={ `${number5}-rating` }
              onChange={ this.inputChange }
            />
          </div>
          <textarea
            name="text"
            data-testid="product-detail-evaluation"
            cols="30"
            rows="10"
            placeholder=" Digite seu comentário... "
            required
            value={ text }
            onChange={ this.inputChange }
          />
          <button
            data-testid="submit-review-btn"
            onClick={ this.submitButton }
          >
            Avaliar
          </button>
          {rec
            .map((
              {
                email: param1,
                rating: param2,
                text: param3 },
              index,
            ) => (
              (
                <div key={ `${email}${index}` }>
                  <p data-testid="review-card-email">{param1}</p>
                  <p data-testid="review-card-rating">{param2}</p>
                  <p data-testid="review-card-evaluation">{param3}</p>
                </div>)
            ))}
          { valid && <span data-testid="error-msg">Campos inválidos</span> }
        </div>
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
