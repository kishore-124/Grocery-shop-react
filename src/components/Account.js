import React, { Component } from 'react'
import axios from 'axios'
import './Account.css';
import 'react-toastify/dist/ReactToastify.css'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavBar from './NavBar';


toast.configure()
class Account extends Component {

    constructor(props) {
        super(props)
        this.state = { user: '', redirect: false, file: "", image: [], role: '', loggedin: false, wallet: ''}
        this.handleProfilePicChange = this.handleProfilePicChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.add_money = this.add_money.bind(this);
    }

    handleProfilePicChange(event) {
        let files = event.target.files;
        this.setState({
            image: files[0]
        })   
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let data = new FormData();
        data.append("file", this.state.image)
        axios.put('http://localhost:8080/user/' + this.state.user.id, data, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('access-token')}` }
        });
      window.location.reload();
    };

    add_money ()
    {
     console.log('I am in add money')
    } 

    componentDidMount() {
      let username = localStorage.getItem('userName')
    
           axios.get('http://localhost:8080/user?username='+localStorage.getItem('username'), { headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}`}})
            .then(response => {
                console.log(response)
                this.setState({loggedin: true})
                this.setState({ user: response.data })
                this.setState({ role: response.data.role })
                this.setState({ wallet: response.data.wallet })
            })
            .catch(error => {
                this.props.history.push('/login');
                toast.error("You must Sign in to continue", { position: toast.POSITION.TOP_CENTER })
              })  
    }
  
    render() {
        const { user } = this.state
        const { role } = this.state
        const { wallet } = this.state
        return (
            <div>
              <NavBar/>
                <div className="profile-pic" >
                    {user.data ?
                        <img src={"data:image/png;base64," + user.data} alt="image" className="image" />
                        :
                        <form encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                            <input type="file"
                                onChange={this.handleProfilePicChange}
                            />
                            <br /><br />
                            <button className="btn btn-primary btn-sm" type="submit">upload</button>
                        </form>
                    }
                </div>
                < hr />
                <div >
                    <strong>Username</strong>       <simple className="username">{user.userName}</simple>   <br /><br />
                    <strong>Email</strong>          <simple className="email">{user.email}</simple> <br /><br />
                    <strong>Phone Number</strong>   <simple className="phone_number">{user.phone_number}</simple> <br /><br />
                    <strong>Wallet Balance</strong>  <simple className="wallet">{wallet.amountAvailable}</simple> <button className = "Add_money" onClick={this.add_money}>Add Money</button> <br /><br />
                </div>
                <hr />
                <div className="order-heading"> <strong>Orders</strong></div>

            </div>

        )
    }

}

export default withRouter(Account)