import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

    async componentDidMount() {
        const res = await this.props.getSecret();
        console.log(res);
    }

    render() {
        const { secret } = this.props;

        return (
            <div>
                This is a Dashboard.
                <p>{ secret }</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        secret: state.dash.secret,
    }
}

export default connect(mapStateToProps, actions)(Dashboard);