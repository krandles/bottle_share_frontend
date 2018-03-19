import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Popup } from 'semantic-ui-react'
// import AuthAction from './AuthAction'
// import SignupForm from './signup/SignupForm'

const Navigation = () => {
  return (
    <div className="ui top fixed menu">
      <div className="item">
        <NavLink to="/" exact>Home</NavLink>
      </div>
      <NavLink to="/events" exact className="item">Events</NavLink>
      {/* <NavLink to="/breweries" exact className="item">Breweries</NavLink>
      <NavLink to="/reviews" exact className="item">Reviews</NavLink> */}
      <div className="right menu">
        <NavLink to="/users/1" >
          <Popup 
            trigger={<Icon name="user circle" size="large"/>}
            content="User options here"
            on="click"
          />
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation