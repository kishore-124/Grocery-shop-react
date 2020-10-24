import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { toast } from 'react-toastify';
import Product from './Product';


toast.configure();
class Home extends Component {


    constructor(props) {
        super(props)
        this.state = { products: [], redirect: false }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/products', { headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } })
            .then(response => {
                console.log(response)
                this.setState({ products: response.data })
            })
            .catch(error => {
                if (error.response.status == 401) {
                    this.props.history.push('/login');
                    toast.error("You must Sign in to continue", { position: toast.POSITION.TOP_CENTER })
                }
            })
    }

    render() {
        const { products } = this.state
        return (
            <div>
                <NavBar />
                <div class="row">
                
                {
                    products.map(
                        product => <div key={product.id}>
                            <Product name={product.productName} image={product.image} quantity={product.quantity} price={product.price} />
                        </div>
                    )}</div>
                    
            </div>
        )
    }
}

export default Home