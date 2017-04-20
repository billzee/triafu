import React, { Component } from 'react';

export default class ErrorMessage extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <box>
        <small className="form-control-feedback text-danger">{this.state.errors ? this.state.errors.text[0] : null}</small>
      </box>
    );
  }
}
