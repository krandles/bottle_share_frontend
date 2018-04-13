import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Icon, Menu, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout, getCurrentUser } from '../actions/users'

class Navigation extends React.Component {

  // componentDidMount() {
  //   if (localStorage.getItem("token")) {
  //     this.props.getCurrentUser(this.props.userID)
  //   }
  // }

  render() {
    return (
      <Menu inverted color='blue' className="fixed top">
        <Menu.Item name="home" as={NavLink} exact to="/" >
          <img className="nav-logo" src="../img/logo.svg" alt="logo"/>
        </Menu.Item>
        <Menu.Item name="beers" as={NavLink} exact to="/beers" >
          Beers
        </Menu.Item>
        <Menu.Item name="breweries" as={NavLink} exact to="/breweries" >
          Breweries
        </Menu.Item>
        <Menu.Item name="reviews" as={NavLink} exact to="/reviews" >
          Reviews
        </Menu.Item>
        <Menu.Item name="events" as={NavLink} exact to="/events" >
          Events
        </Menu.Item>
        <Menu.Item name="invitations" as={NavLink} exact to="/invitations" >
          Invitations
        </Menu.Item>
        <div className="top right menu">
          {this.props.loggedIn ?
            <Popup
              horizontalOffset={3}
              trigger={<Icon className='avatar' name="user circle" size="big"/>}
              content={
                <div className='user-popup'>
                  <h4>{this.props.currentUser.name}</h4>
                  <Button
                    basic
                    fluid
                    color='red'
                    onClick={() => this.props.logout(this.props.history)}
                  >
                    Logout
                  </Button>
                  {/* </Button.Group> */}
                </div>
              }
              on="click"
            /> 
            :
            null
          }
        </div>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userID: state.userID,
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, { logout, getCurrentUser })(Navigation))