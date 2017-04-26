import React, { Component } from 'react';

export default class ErrorMessage extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <small className="text-danger">{this.props.message}</small>
    );
  }
}
