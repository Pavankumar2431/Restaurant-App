import React, {Component} from 'react'
import './index.css'

class DishesTabs extends Component {
  onClickTabItem = () => {
    const {eachTabDetails, updateActiveTabId} = this.props
    updateActiveTabId(eachTabDetails.menuId)
  }

  render() {
    const {eachTabDetails, isActive} = this.props
    const {menuCategory} = eachTabDetails

    const activeTabClassName = isActive ? 'active-tab-btn' : ''

    return (
      <li
        className={`menu-button  ${activeTabClassName}`}
        onClick={this.onClickTabItem}
      >
        <button className={`menu-button btn-dish  ${activeTabClassName}`}>
          {menuCategory}
        </button>
      </li>
    )
  }
}

export default DishesTabs
