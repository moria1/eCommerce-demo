import React from "react";
import logo from '../logo.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CartItem = props => {
    const { cartItem } = props;
    const { product, amount } = cartItem;

    return (
        <Card key={product.id+'ci'}>
            <Card.Body>
                <Row key={product.id+'cir'}>
                    <Col key={product.id+'cic1'}><img src={logo} alt={product.description} /></Col>
                    <Col key={product.id+'cic2'}>
                        <Card.Title><b>{product.name}</b></Card.Title>
                        <b>${product.price}</b>
                        <Card.Text>
                            <small>{`${amount} in cart`}</small>
                        </Card.Text>
                    </Col>
                    <Col key={product.id+'cic3'}>
                        <Button variant="dark" onClick={() => props.removeFromCart({
                            id: product.name,
                            product
                        })}>
                            remove
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CartItem;