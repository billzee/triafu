import React, { Component } from 'react';

export default class AuthenticationError extends Component {
  constructor(){
    super();
  }

  componentDidMount(){
    if(this.props.message)
  }

  render(){
    return (
      <small className="text-danger">{this.props.message}</small>
    );
  }
}
