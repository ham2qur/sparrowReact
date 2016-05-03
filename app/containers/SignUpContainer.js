import React, { Component } from 'react';
import { Link } from 'react-router';
import { signUp } from '../helpers/auth';

function SignUpMessage({attempt,success}){
  function message(){
    if(attempt === true){
      if(success === true){
        return <p>Succesfully registered!</p>
      }else
      {
        return <p>Failed try another username!</p>
      }
    }
  }
  return <div>{message()}</div>
}


export default class SignUpContainer extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      attempt:false,
      success:false,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.username || !this.state.email || !this.state.password){
      this.setState({attempt:true})
      return
    }
    signUp(this.state.username,this.state.email,this.state.password)
      .then((res)=>{
        console.log(res)
        if(res.data.success === true){
          this.setState({
            username: '',
            password: '',
            email: '',
            attempt: true,
            success: true
          })
          location.href = location.origin;
        }else{
          this.setState({
            attempt: true,
            success: false
          })
        }
      })
  }

  render() {


    return (
      <div>
          <h2>Sign up!</h2>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="col-sm-2 control-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  placeholder="Username"
                  autofocus className="form-control"
                  value={this.state.username}
                  onChange={this.handleUserChange}
                  id="username"
                />
              </div>
            </div>
             <div className="divider" />
            <div className="form-group">
              <label htmlFor="email" className="col-sm-2 control-label">
                Email
              </label>
            <div className="col-sm-10">
              <input
                type="email"
                placeholder="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleEmailChange}
                id="email"
              />
            </div>
            </div>
            <div className="divider" />
            <div className="form-group">
              <label htmlFor="password" className="col-sm-2 control-label">
                Password
              </label>
            <div className="col-sm-10">
              <input
                type="text"
                placeholder="Password"
                className="form-control"
                value={this.state.password}
                onChange={this.handlePassChange}
                id="password"
              />
            </div>

            <div className="btn btn-danger btn-signup col-sm-offset-2"
                  type="submit" value="Post">
              Sign Up
            </div>
            </div>
          </form>

        <SignUpMessage attempt={this.state.attempt} success={this.state.success}/>

        <button className="btn" onClick={this.props.onSignUpClick}>Back</button>
      </div>
    );
  }
}
