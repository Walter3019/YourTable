import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
    class MixedComponent extends Component {

        checkAuth = () => {
            const { isAuth, jwtToken } = this.props;
            if(!isAuth && !jwtToken) {
                // console.log('All is good');
                this.props.history.push('/');
            }
        }
        
        componentDidMount() {
            // Whether the user is authenticated.
            this.checkAuth();
        }

        componentDidUpdate() {
            // Whether the user is authenticated.
            this.checkAuth();
        }

        render() {
            return <OriginalComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token,
        }
    }

    return connect(mapStateToProps)(MixedComponent);
}