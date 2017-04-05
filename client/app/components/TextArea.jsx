import React, { Component } from 'react';

export default class TextArea extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <box>
        <textarea {...this.props} className="form-control w-100 mb-2"></textarea>
      </box>
    );
  }
}
