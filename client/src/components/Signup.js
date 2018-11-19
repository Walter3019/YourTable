import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login'

import CustomInput from './CustomInput';

import * as actions from '../actions';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    async onSubmit(formData) {
        console.log('onSubmit() got called');
        console.log('formData', formData);
        // We need to call some actionCreator
        await this.props.signUp(formData);
        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    async responseGoogle(res) {
        const { oauthGoogle } = this.props;

        await oauthGoogle(res.accessToken);
        console.log('google-res', res);

        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    async responseFacebook(res) {
        const { oauthFacebook } = this.props;

        await oauthFacebook(res.accessToken);
        console.log('facebook-res', res);

        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={ handleSubmit(this.onSubmit) }>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="example@gmail.com"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder= "yoursuperpassword"
                                component={ CustomInput } />
                        </fieldset>

                        { this.props.errorMessage ? 
                            <div className="alert alert-danger">
                                { this.props.errorMessage }
                            </div> 
                            : null }

                        <button type="submit" className="btb btn-primary">Sign Up</button>
                    </form>
                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            Or sign up using third-party services
                        </div>
                        <FacebookLogin
                            appId="2161431170554735"
                            textButton="Facebook"
                            fields="name, email, picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary" />
                        <GoogleLogin 
                            clientId="625541407655-lfotpetkdh5vhdddc2vgoklufk5akkfd.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={ this.responseGoogle }
                            onFailure={ this.responseGoogle }
                            className="btn btn-outline-danger"/>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup);