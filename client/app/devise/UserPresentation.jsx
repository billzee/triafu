import React, { Component } from 'react';
import helper from '../components/Helper'

export default class UserPresentation extends Component {
  constructor(props){
    super();
    this.state = {
      text: props.text,
    }
  }

  render(){
    return(
      <box>
        <h2>Apresentação</h2>
        <p dangerouslySetInnerHTML={{__html: helper.urlify(this.state.text)}}></p>
      </box>
    );
  }
}
