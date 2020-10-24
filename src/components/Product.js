import React, { Component } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Grid } from "@material-ui/core/";
import './Product.css'

class Product extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="Product_card">
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={"data:image/png;base64," + this.props.image} className="image" />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                     <p><strong>Price:</strong>  {this.props.price}</p>
                        </Card.Text>
                        <button className="cart">ADD TO CART</button>
                    </Card.Body>
                </Card>
            </div>

        )
    }
}

export default Product