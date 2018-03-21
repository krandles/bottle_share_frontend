import React from 'react'
import { NavLink, Link } from 'react-router-dom'
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
                       <Button.Group vertical>
                        <Button onClick={() => props.logout(props.history)} >Logout</Button>
                        <Button><Link to="/account" >My Account</Link></Button>
                       </Button.Group>
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