import React, {Component} from 'react'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  static contextType = CartContext

  onClickRemoveAllButton = () => {
    this.context.removeAllCartItems()
  }

  renderEmptyView = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your cart is Empty.</p>
    </div>
  )

  renderCartItems = () => (
    <>
      <div className="cart-container">
        <h1 className="cart-heading">Cart Items</h1>
        <button
          type="button"
          className="cart-button"
          onClick={this.onClickRemoveAllButton}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-items-container">
        {this.context.cartList.map(eachCartItem => (
          <CartItem cartItemDetails={eachCartItem} key={eachCartItem.dishId} />
        ))}
      </ul>
    </>
  )

  render() {
    const {cartList} = this.context

    return (
      <div>
        <Header />
        {cartList.length === 0
          ? this.renderEmptyView()
          : this.renderCartItems()}
      </div>
    )
  }
}

export default Cart
