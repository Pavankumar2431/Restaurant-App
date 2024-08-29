import React, {Component} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

class CartItem extends Component {
  static contextType = CartContext

  onIncreaseQty = () => {
    this.context.incrementCartItemQuantity(this.props.cartItemDetails.dishId)
  }

  onDecreaseQty = () => {
    this.context.decrementCartItemQuantity(this.props.cartItemDetails.dishId)
  }

  onRemoveCartItem = () => {
    this.context.removeCartItem(this.props.cartItemDetails.dishId)
  }

  render() {
    const {
      dishId,
      dishName,
      dishImage,
      quantity,
      dishCurrency,
      dishPrice,
    } = this.props.cartItemDetails

    return (
      <li className="cart-item-container">
        <img className="cart-item-image" src={dishImage} alt={dishName} />
        <div className="cart-item-details">
          <p className="cart-item-name">{dishName}</p>
          <p className="dish-currency-price">
            {dishCurrency} {(quantity * dishPrice).toFixed(2)}
          </p>
          <div className="control-btn-group">
            <button
              type="button"
              className="control-btn"
              onClick={this.onDecreaseQty}
            >
              -
            </button>
            <p className="cart-item-quantity">{quantity}</p>
            <button
              type="button"
              className="control-btn"
              onClick={this.onIncreaseQty}
            >
              +
            </button>
          </div>
        </div>
        <button
          type="button"
          className="remove-btn"
          onClick={this.onRemoveCartItem}
        >
          <FaRegTrashAlt className="remove-btn-icon" />
        </button>
      </li>
    )
  }
}

export default CartItem
