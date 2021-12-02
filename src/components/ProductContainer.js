import React from "react";
import Product from "./Product";
import WrapContext from "../WrapContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductContainer = props => {
    const { products } = props.context;
    const productsChunks = [];
    const tmp = [...products]
    while (tmp.length) {
        productsChunks.push(tmp.splice(0, 3))
    }

    const rows = productsChunks.map((productChunk, i) => {
        const productsCols = productChunk.map((product, i) => {
            return (
                <Col xs="4" key={product.id+'pcc'+i}>
                    <Product
                        product={product}
                        key={product.id+'pc'+i}
                        addToCart={props.context.addToCart}
                    />
                </Col>
            );
        });
        return <div><Row key={i+'pc'}>{productsCols}</Row><br /></div>
    });

    return (
        <>
            <h4>Our Products</h4>
            <br />
            <Container key='pc'>
                {rows}
            </Container>
        </>
    );
};

export default WrapContext(ProductContainer);