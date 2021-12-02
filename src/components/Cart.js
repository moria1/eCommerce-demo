import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import WrapContext from "../WrapContext";
import CartItem from "./CartItem";

const Cart = props => {
    const { cart, cartSummary } = props.context;
    const cartKeys = Object.keys(cart || {});
    return (
        <>
            <h4>My Cart</h4>
            <br />
            <div className="container">
                {cartKeys.length ?
                    (<Container>
                        <Stack >
                            {cartKeys.map(key => (
                                <div>
                                    <div className="bg-light border">
                                        <CartItem
                                            cartKey={key}
                                            key={cart[key].id + 'c'}
                                            cartItem={cart[key]}
                                            removeFromCart={props.context.removeFromCart}
                                        />
                                    </div>
                                    <br />
                                </div>))
                            }
                        </Stack>
                        <h5>Summary: ${cartSummary}</h5>
                        <Button>Checkout</Button>
                    </Container>
                    ) : (
                        <b>No item found in cart</b>
                    )}
            </div>
        </>
    );
};

export default WrapContext(Cart);