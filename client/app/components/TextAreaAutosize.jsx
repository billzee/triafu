import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default class TextArea extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <box className="w-100">
        <TextareaAutosize {...this.props} className="form-control w-100"></TextareaAutosize>
      </box>
    );
  }
}
