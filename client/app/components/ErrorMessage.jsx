import React, { Component } from 'react';

export default class ErrorMessage extends Component {
  render(){
    return (
      <small className="text-danger">{this.props.message}</small>
    );
  }
}
