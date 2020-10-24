import React, { Component } from 'react';
import axios from 'axios';
import './NewProduct.css';

class NewProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productName: '',
            price: '',
            image: [],
            quantity: ''
        }
        this.handleproductnameChange = this.handleproductnameChange.bind(this)
        this.handlepriceChange = this.handlepriceChange.bind(this)
        this.handleimageChange = this.handleimageChange.bind(this)
        this.handlequantityChange = this.handlequantityChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleproductnameChange(event) {
        this.setState({
            productName: event.target.value
          })
    }

    handlepriceChange(event) {
        this.setState({
            price: event.target.value
          })
    }

    handlequantityChange(event) {
        this.setState({
            quantity: event.target.value
          })
    }

    handleimageChange(event) {
        let files = event.target.files;
        this.setState({
            image: files[0]
        }) 
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let data = new FormData();
        data.append("image", this.state.image)
        data.append("productName", this.state.productName)
        data.append("price", this.state.price)
        data.append("quantity", this.state.quantity)
        console.log(this.state.image);
        axios.post('http://localhost:8080/product', data, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('access-token')}` }
        });
    }

    render() {
        return (
            <div className="product">
                <h2>New Product</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text"
                        value={this.state.productName}
                        className="form-fields"
                        placeholder="Product Name"
                        onChange={this.handleproductnameChange}
                    /><br/>

                    <input type="text"
                        className="form-fields"
                        placeholder="Price"
                        value={this.state.price}
                        onChange={this.handlepriceChange}
                    /><br/>

                    <input type="text"
                        className="form-fields"
                        placeholder="Quantity"
                        value={this.state.quantity}
                        onChange={this.handlequantityChange}
                    /><br/>

                    <input type="file"
                     className="form-fields"
                        onChange={this.handleimageChange}
                    /><br/>
                    <button className="button-product" type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default NewProduct;