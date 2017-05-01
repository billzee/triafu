import React, { Component } from 'react';
import pubsub from 'pubsub-js'


export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {media: props.media};
  }

  componentDidMount(){
    console.log(this.props.media);
  }

  render(){
    return (
      <box>
      </box>
    );
  }
}
