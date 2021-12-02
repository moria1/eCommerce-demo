import React, { Component, useState } from "react";
import './App.css';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cart from './components/Cart';
import ProductContainer from './components/ProductContainer';
import { Context } from "./Context";

const CartWrapper = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      {show ?
        (<div className="popover top-50 start-0 shadow position-fixed w-50 h-50 overflow-auto">
          <Toast show={show} onClose={() => toggleShow(false)}>
            <Toast.Header></Toast.Header>
            <Toast.Body>{children}</Toast.Body>
          </Toast>
        </div>)
        : (<Button onClick={() => toggleShow(true)}>Show Cart</Button>)}
    </>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      cartSummary: 0,
      products: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    const products = await axios.get('http://localhost:3001/products');
    let cart = localStorage.getItem("cart");
    let cartSummary = localStorage.getItem("cartSummary");
    cart = cart ? JSON.parse(cart) : {};
    cartSummary = cartSummary ? JSON.parse(cartSummary) : 0;
    this.setState({ products: products.data, cart, cartSummary });
  }

  addToCart = cartItem => {
    let cart = this.state.cart;
    let cartSummary = this.state.cartSummary;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    cartSummary += cartItem.amount * cartItem.product.price;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartSummary", JSON.stringify(cartSummary));
    this.setState({ cart, cartSummary });
  };

  removeFromCart = cartItem => {
    let cart = this.state.cart;
    let cartSummary = this.state.cartSummary;
    cartSummary -= cart[cartItem.id].amount * cartItem.product.price;
    delete cart[cartItem.id];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartSummary", JSON.stringify(cartSummary));
    this.setState({ cart, cartSummary });
  };

  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        removeFromCart: this.removeFromCart,
        addToCart: this.addToCart,
      }}
      >
        <h1 className="header text-center">E-Commerce demo</h1>
        <Container key='c1' className="p-3">
          <CartWrapper>
            <Cart />
          </CartWrapper>
        </Container>
        <Container key='c2' className="p-5 mb-4 bg-light rounded-3">
          <ProductContainer />
        </Container>
      </Context.Provider>
    );
  }
}