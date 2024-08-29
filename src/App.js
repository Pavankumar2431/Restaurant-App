import React, {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Home from './components/Home'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantName: '',
      cartList: [],
    }
  }

  setRestaurantName = restaurantName => {
    this.setState({restaurantName})
  }

  addCartItem = dish => {
    const {cartList} = this.state
    const dishAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (dishAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : {...item},
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, dish],
      }))
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const filteredResults = cartList.filter(
      eachItem => eachItem.dishId !== dishId,
    )
    this.setState({cartList: filteredResults})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const dishAlreadyExists = cartList.find(item => item.dishId === dishId)
    if (dishAlreadyExists.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  render() {
    const {restaurantName, cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          restaurantName,
          setRestaurantName: this.setRestaurantName,
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
