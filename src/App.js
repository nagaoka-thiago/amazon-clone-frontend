import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header'
import HeaderAdmin from './HeaderAdmin';
import Home from './Home'
import HomeAdmin from './HomeAdmin'
import Cart from './Cart'
import Login from './Login'
import RegisterUser from './RegisterUser';
import UserAdmin from './UserAdmin';
import ProductAdmin from './ProductAdmin'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const axios = require('axios')

function App() {

  const [cart, setCart] = useState([])

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const [sinalizeDataBase, setSinalizeDataBase] = useState(true)

  useEffect(() => {
    if(user) {
      if(!('isAdmin' in user)) {
        axios.get(`/cartitems/${user.cpf}/`)
        .then(function(response) {
          setCart(response.data)
        })
      }
    }
}, [sinalizeDataBase])

  return (
      <Router>
        {
          user === null ? (
                              <Switch>
                                  <Route path="/register">
                                    <RegisterUser />
                                  </Route>
                                  <Route path="/">
                                    <Login setUser={ setUser } sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
                                  </Route>
                              </Switch>
                         ) : !('isAdmin' in user) ? (
                              <Container>
                                <Header user={ user } setUser={ setUser } cart={cart} sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
                                <Switch>
                                  <Route path="/login">
                                    <Login setUser={ setUser } sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
                                  </Route>
                                  <Route path="/cart">
                                    <Cart user={ user } cart={cart} sinalizeDataBase = {sinalizeDataBase} setSinalizeDataBase = {setSinalizeDataBase} />
                                  </Route>
                                  <Route path="/">
                                    <Home user={ user } cart={cart} sinalizeDataBase = {sinalizeDataBase} setSinalizeDataBase = {setSinalizeDataBase} />
                                  </Route>
                                </Switch>
                              </Container>
                            ) : (
                              <Container>
                                <HeaderAdmin setUser={ setUser } sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
                                <Switch>
                                  <Route path="/userscontrol">
                                    <UserAdmin />
                                  </Route>
                                  <Route path="/productscontrol">
                                    <ProductAdmin />
                                  </Route>
                                  <Route path="/">
                                    <HomeAdmin />
                                  </Route>
                                </Switch>
                              </Container>
                            )
        }
      </Router>
  );
}

export default App;

const Container = styled.div``
