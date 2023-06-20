import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from './CardProduct';
// import DetailsProduct from './DetailsProduct';
import '../App.css';

class ListaProdutos extends Component {
  state = {
    inputSearch: '',
    products: [],
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const allCategories = await getCategories();
    this.setState({
      categories: allCategories,
    });
  };

  handlerChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handlerCategoriesClick = async () => { // função que retorna a api pelo nome dos produtos
    const { inputSearch } = this.state;
    const data = await getProductsFromCategoryAndQuery('', inputSearch);
    this.setState({
      products: data.results,
    });
    // console.log(data.results);
  };

  filterByCategories = async (id, name) => {
    // função que busca os produtos pela categoria recebendo o id de cada input clicado
    const category = await getProductsFromCategoryAndQuery(id, name);
    console.log(id, category.results);
    this.setState({
      // estado que guarda os produtos da categoria clicada
      products: category.results,
    });
  };

  render() {
    const { inputSearch, products } = this.state;
    const { categories } = this.state;
    console.log(products);
    return (
      <div>
        <section className="seach">
          <div className="logo-store">
            <p>Trybe Store</p>
          </div>
          <div>
            <input
              type="text"
              id="search input"
              name="inputSearch"
              onChange={ this.handlerChange }
              value={ inputSearch }
              placeholder="Buscar"
              data-testid="query-input"
            />
            <button
              data-testid="query-button"
              onClick={ this.handlerCategoriesClick }
            >
              Search
            </button>
            <div id="mensagem-inicial" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
          </div>
          <button className="btn-cart">
            <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
          </button>
        </section>

        <section className="container-shop">
          <section className="categorias">
            <h2 className="title-categorie">Categorias</h2>
            { categories.map((categorie) => (
              <div key={ `${categorie.id}` }>
                <label data-testid="category" htmlFor={ `${categorie.id}` }>
                  <input
                    id={ `${categorie.id}` }
                    type="radio"
                    name="categorie"
                    onClick={ () => {
                      this
                        .filterByCategories(categorie.id, categorie.name);
                    } }
                  />
                  {categorie.name}
                </label>
              </div>
            )) }
          </section>
          <section className="display-products">
            { products.length > 0
              ? (products.map(({ id, title, thumbnail, price, quantity }) => (

                <CardProduct
                  key={ id }
                  data-test="product"
                  { ...this.state }
                  id={ id }
                  products={ products }
                  title={ title }
                  image={ thumbnail }
                  price={ price }
                  quantity={ quantity }
                />

              ))) : <span>Nenhum produto foi encontrado</span>}
          </section>
        </section>
      </div>
    );
  }
}

export default ListaProdutos;
