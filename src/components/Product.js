import React from "react";
import logo from '../logo.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Product = props => {
    const { product } = props;
    return (
        <Card key={product.id+'c'} >
            <Card.Img variant="top" src={logo} />
            <Card.Body>
                <Card.Title><b>{product.name}</b></Card.Title>
                <b>${product.price}</b>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Button variant="primary" onClick={() => props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                })
                }>
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Product;