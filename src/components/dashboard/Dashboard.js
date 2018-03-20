import React from 'react'
import { Button } from 'semantic-ui-react'
import { logout } from '../../actions/users'
import { connect } from 'react-redux'

class Dashboard extends React.Component {

  render() {
    return (
      <div className='main-content'>
        Dashboard Goes Here
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn }
}

export default connect(mapStateToProps)(Dashboard)