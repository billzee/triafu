import React, { Component } from 'react';
import pubsub from 'pubsub-js'


export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {imageUrl: props.imageUrl || null, videoUrl: props.videoUrl || null};
    console.log(this.state);
  }

  componentDidMount(){
    // console.log(this.props.media);
  }

  render(){
    return (
      <box>
        {
          this.state.imageUrl ?
          (
            <img src={this.state.imageUrl} className="post-media"/>
          )
          : this.state.videoUrl ?
          (
            <video autoPlay className="post-media">
              <source src={this.state.videoUrl}/>
            </video>
          )
          : null
        }
      </box>
    );
  }
}
