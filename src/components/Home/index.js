import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import CartContext from '../../context/CartContext'
import DishesTabs from '../DishesTabs'
import DishDetails from '../DishDetails'
import Header from '../Header'
import './index.css'

class Home extends Component {
  // Moving contextType declaration outside the class body
  static contextType = CartContext

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      response: [],
      activeTabId: '',
    }
  }

  componentDidMount() {
    this.fetchRestaurantApi()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuId: eachMenu.menu_category_id,
      menuImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  fetchRestaurantApi = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(url)
    const data = await apiResponse.json()
    const updatedData = this.getUpdatedData(data[0].table_menu_list)
    this.setState({
      response: updatedData,
      activeTabId: updatedData[0].menuId,
      isLoading: false,
    })
    const {setRestaurantName} = this.context
    setRestaurantName(data[0].restaurant_name)
  }

  updateActiveTabId = menuId => {
    this.setState({activeTabId: menuId})
  }

  renderDishes = () => {
    const {activeTabId, response} = this.state
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuId === activeTabId,
    )
    return (
      <ul>
        {categoryDishes.map(eachDish => (
          <DishDetails dishDetails={eachDish} key={eachDish.dishId} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0b69ff" heigth="50" width="50" />
    </div>
  )

  render() {
    const {isLoading, response, activeTabId} = this.state

    return isLoading ? (
      this.renderLoader()
    ) : (
      <>
        <Header />
        <div>
          <ul className="tab-items-container">
            {response.map(eachTabItem => (
              <DishesTabs
                eachTabDetails={eachTabItem}
                key={eachTabItem.menuId}
                updateActiveTabId={this.updateActiveTabId}
                isActive={activeTabId === eachTabItem.menuId}
              />
            ))}
          </ul>

          {this.renderDishes()}
        </div>
      </>
    )
  }
}

export default Home
