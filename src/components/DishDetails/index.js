import React, {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class DishDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 0}
  }

  static contextType = CartContext

  onIncreaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecreaseQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 0 ? prevState.quantity - 1 : 0,
    }))
  }

  onClickAddToCart = () => {
    const {dishDetails} = this.props
    const {quantity} = this.state
    this.context.addCartItem({...dishDetails, quantity})
  }

  renderNotAvailable = () => <h1 className="not-available">Not Available</h1>

  renderButton = () => (
    <div className="dish-button-card">
      <button
        type="button"
        className="dish-button"
        onClick={this.onDecreaseQuantity}
      >
        -
      </button>
      <p>{this.state.quantity}</p>
      <button
        type="button"
        className="dish-button"
        onClick={this.onIncreaseQuantity}
      >
        +
      </button>
    </div>
  )

  renderText = () => <h1 className="custom-text">Customizations Available</h1>

  render() {
    const {
      dishCalories,
      dishCurrency,
      dishDescription,
      dishImage,
      dishName,
      dishPrice,
      dishAvailability,
      dishType,
      addonCat,
    } = this.props.dishDetails

    return (
      <li className="eachdish-list">
        <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
          <div
            className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`}
          />
        </div>
        <div className="dishdetails-container">
          <div className="left-dish-details">
            <h1 className="dish-name">{dishName}</h1>
            <p className="dish-price">
              {dishCurrency} {dishPrice}
            </p>
            <p className="dish-description">{dishDescription}</p>
            <p>
              {dishAvailability === true
                ? this.renderButton()
                : this.renderNotAvailable()}
            </p>
            {addonCat.length !== 0 ? this.renderText() : ''}
            {this.state.quantity > 0 && (
              <button
                type="button"
                className="addtocart-btn"
                onClick={this.onClickAddToCart}
              >
                ADD TO CART
              </button>
            )}
          </div>

          <h1 className="dish-cals">{dishCalories} calories</h1>
          <img src={dishImage} alt="menuimage" className="dish-image" />
        </div>
      </li>
    )
  }
}

export default DishDetails
