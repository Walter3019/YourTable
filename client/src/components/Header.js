import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {

    signOut = () => {
        const { signOut } = this.props;

        signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: '30px'}}>
                <Link to="/" className="navbar-brand">API Auth</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">DashBoard</Link>
                        </li>
                    </ul>
                </div>

                <ul className="nav navbar-nav ml-auto">
                    { !this.props.isAuth ?
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">Sign In</Link>
                            </li>
                        </Fragment>
                     : null}
                    { this.props.isAuth ? 
                        <li className="nav-item">
                            <Link to="/signout" className="nav-link" onClick={this.signOut}>Sign Out</Link>
                        </li>
                    : null }    

                </ul>
            </nav>
        )
    }
}

function mapStartToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
    }
}

export default connect(mapStartToProps, actions)(Header);