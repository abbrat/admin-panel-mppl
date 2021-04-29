import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction, getData } from "../../actions/adminActions";
import makeToast from "../../Toaster";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false,
    };
  }

  onChangeHandler = (e) => {
    var n = e.target.name;
    var v = e.target.value;
    this.setState({
      [n]: v,
    });
  };

  changeCheck = (e) => {
    this.setState({ remember: !this.state.remember });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const cred = {
      email: this.state.email,
      password: this.state.password,
      remember: this.state.remember,
    };

    try {
      await loginAction(cred)
        .then(async (res) => {
          console.log(res.data.msg);
          if (res.data.msg === "User Logged in Successfully") {
            let tokens =
              (await localStorage.getItem("x-auth-token")) ||
              (await sessionStorage.getItem("x-auth-token"));

            await this.props.dispatch({
              type: "SETTOKENS",
              payload: { token: tokens },
            });
            return tokens;
          }
        })
        .then(async (t) => {
          await getData(this.props.state.tokens).then((data) => {
            this.props.dispatch({
              type: "SETROLE",
              payload: { role: data.role },
            });
          });
        });
      await this.props.dispatch({ type: "LOGIN" });
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };

  render() {
    return (
      <div className='container-scroller'>
        <div className='container-fluid page-body-wrapper full-page-wrapper'>
          <div className='content-wrapper d-flex align-items-stretch auth auth-img-bg'>
            <div className='row flex-grow'>
              <div className='col-lg-6 d-flex align-items-center justify-content-center'>
                <div className='auth-form-transparent text-left p-3'>
                  <div className='brand-logo'>
                    <img src='./MPPL_logo.png' alt='logo' />
                  </div>
                  <h4>Welcome back!</h4>
                  <h6 className='font-weight-light'>Happy to see you again!</h6>
                  <form className='pt-3' onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <label>Email</label>
                      <div className='input-group'>
                        <div className='input-group-prepend bg-transparent'>
                          <span className='input-group-text bg-transparent border-right-0'>
                            <i className='mdi mdi-account-outline text-primary'></i>
                          </span>
                        </div>
                        <input
                          type='text'
                          className='form-control form-control-lg border-left-0'
                          name='email'
                          placeholder='Email'
                          value={this.state.email}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label>Password</label>
                      <div className='input-group'>
                        <div className='input-group-prepend bg-transparent'>
                          <span className='input-group-text bg-transparent border-right-0'>
                            <i className='mdi mdi-lock-outline text-primary'></i>
                          </span>
                        </div>
                        <input
                          type='password'
                          className='form-control form-control-lg border-left-0'
                          name='password'
                          placeholder='Password'
                          value={this.state.password}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                    </div>
                    <div className='my-2 d-flex justify-content-between align-items-center'>
                      <div className='form-check'>
                        <label className='form-check-label text-muted'>
                          <input type='checkbox' className='form-check-input' />
                          <input
                            type='checkbox'
                            defaultChecked={this.state.remember}
                            onChange={this.changeCheck}
                          />
                          Keep me signed in
                        </label>
                      </div>
                      <a
                        href='/forgot-password'
                        className='auth-link text-black'>
                        Forgot password?
                      </a>
                    </div>
                    <div className='my-3'>
                      <button
                        className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                        type='submit'>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-lg-6 login-half-bg d-flex flex-row'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Login);
