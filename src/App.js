import React from 'react';
import './App.css';
import './components/Login';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NewProduct from './components/NewProduct';
import {BrowserRouter as Router,Switch ,Route}  from 'react-router-dom'

function App() {
  return (
    <div >
    <Router>
<Switch>
<Route exact strict path="/login"  component={Login}/>
<Route exact strict path="/register"  component={Register}/>
<Route exact strict path="/account"  component={Account}/>
<Route exact strict path="/product/new"  component={NewProduct}/>
<Route exact strict path="/"  component={Home}/>
<Route exact strict  component={PageNotFound}/>
</Switch>
    </Router>
  </div>
  );
}

export default App;
