import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Dashboard extends React.Component {

  render() {
    return (
      <div className='main-content'>
        Dashboard Goes Here
        <Button><Link to="/events/new">Create a New Bottle Share</Link></Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn }
}

export default connect(mapStateToProps)(Dashboard)