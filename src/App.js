import './App.css';
import Header from './Header'
import Home from './Home'
import Cart from './Cart'
import Login from './Login'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RegisterUser from './RegisterUser';

const axios = require('axios')

function App() {

  const [cart, setCart] = useState([])

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const [sinalizeDataBase, setSinalizeDataBase] = useState(true)

  useEffect(() => {
    if(user) {
      axios.get(`/cartitems/${user.cpf}/`)
      .then(function(response) {
        setCart(response.data)
      })
    }
}, [sinalizeDataBase])

  return (
      <Router>
        {
          user == null ? (
                              // <Login setUser={ setUser } sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
                              <Switch>
                                  <Route path="/register">
                                    <RegisterUser />
                                  </Route>
                                  <Route path="/">
                                    <Login setUser={ setUser } sinalizeDataBase={ sinalizeDataBase } setSinalizeDataBase={ setSinalizeDataBase } />
                                  </Route>
                              </Switch>
                         ) : (
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
                            )
        }
      </Router>
  );
}

export default App;

const Container = styled.div``
