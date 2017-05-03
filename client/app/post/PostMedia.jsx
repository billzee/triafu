import React, { Component } from 'react';
import pubsub from 'pubsub-js'


export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {
      imageUrl: (props.imageUrl || null),
      videoUrl: (props.videoUrl || null)
    };
    console.log(this.state);
  }

  componentDidMount(){
    pubsub.subscribe('watch-post', (msg, data)=>{
      if(data.postId === this.props.postId){
        this.video.play();
      } else if(!this.video.paused){
        this.video.pause();
        this.video.currentTime = 0;
      }
    });
    console.log(this.props.postId);
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
            <video loop className="post-media"
            ref={(video) => { this.video = video; }}
            onClick={()=> this.video.paused ? this.video.play() : this.video.pause()}>
              <source src={this.state.videoUrl}/>
            </video>
          )
          : null
        }
      </box>
    );
  }
}
