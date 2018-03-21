import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../actions/users'
// import AuthAction from './AuthAction'
// import SignupForm from './signup/SignupForm'

const Navigation = (props) => {
  return (
    <div className="ui top fixed menu">
      <div className="item">
        <NavLink to="/" exact>Home</NavLink>
      </div>
      <NavLink to="/events" exact className="item">Events</NavLink>
      <NavLink to="/invitations" exact className="item">Invitations</NavLink>
      <div className="top right menu avatar">
        {props.loggedIn ?
          <Popup 
            trigger={<Icon name="user circle" size="big"/>}
            content={<div>
                       <Button onClick={() => props.logout(props.history)} >Logout</Button>
                       <Button><NavLink to="/account" /></Button>
                     </div>
                    }
            on="click"
        /> 
        : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn }
}

export default connect(mapStateToProps, { logout })(Navigation)