import React from 'react'
import Dashboard from './Dashboard'
import { findUser } from '../../actions/users'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

class DashboardContainer extends React.Component {
  
  componentDidMount() {

    if (localStorage.getItem("token")) {
      this.props.findUser(localStorage.getItem("token"))
      // .then(()=>this.props.history.push("/"))
    }
  }

  render() {
    return  (
      <div>
        {this.props.loggedIn ?
          <Dashboard />
          :
          <Redirect to="/login" />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {loggedIn: state.loggedIn}
}

export default connect(mapStateToProps, {findUser})(DashboardContainer)