import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import LoginController from './../logic/login.js'

export class Header extends React.PureComponent {
  render() {
    if(!LoginController.isLoggedIn()) {
      var signupButton = <li><Link to="/sign-up">Sign Up</Link></li>;
      var loginButton = <li><Link to="/login">Login</Link></li>;
    } else {
      var profileButton = <li><Link to="/my-profile">Profile</Link></li>;
      var logoutButton = <li onClick={this.props.logout}>
          <a>Log Out</a>
      </li>;
    }

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">Starcraft 2 AI Ladder</div>
            <ul className="nav navbar-nav">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/bots">Bots</Link></li>
              { signupButton }
              { loginButton }
              { profileButton }
              { logoutButton }
            </ul>
        </div>
      </nav>
    )
  }
}