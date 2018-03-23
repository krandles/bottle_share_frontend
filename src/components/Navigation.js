import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout, getCurrentUser } from '../actions/users'
// import AuthAction from './AuthAction'
// import SignupForm from './signup/SignupForm'

class Navigation extends React.Component {

  // componentDidMount() {
  //   if (localStorage.getItem("token")) {
  //     this.props.getCurrentUser(this.props.userID)
  //   }
  // }

  render() {
      return (
        <div className="ui top fixed menu">
          <div className="item">
            <NavLink to="/" exact>Home</NavLink>
          </div>
          <NavLink to="/events" exact className="item">Events</NavLink>
          <NavLink to="/invitations" exact className="item">Invitations</NavLink>
          <div className="top right menu avatar">
            {this.props.loggedIn ?
              <Popup 
                trigger={<Icon name="user circle" size="big"/>}
                content={<div>
                           <Button.Group vertical>
                            <Button><Link to="/account" >My Account</Link></Button>
                            <Button onClick={() => this.props.logout(this.props.history)} >Logout</Button>
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
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn, userID: state.userID, currentUser: state.currentUser }
}

export default connect(mapStateToProps, { logout, getCurrentUser })(Navigation)