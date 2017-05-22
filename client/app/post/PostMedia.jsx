import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {
      image: (props.image || null),
      video: (props.video || null),
      paused: true
    };

    this.video = null;
  }

  componentDidMount(){
    pubsub.subscribe('watch-post', (msg, data)=>{
      if(this.video !== null){
        if(data.postId === this.props.postId){
          this.video.play();
          this.setState({paused: false});
        } else if(!this.video.paused){
          this.video.pause();
          this.video.currentTime = 0;
          this.setState({paused: true});
        }
      }
    });
  }

  controlManually(){
    if(this.video != null){
      if(this.video.paused){
        this.video.play();
        this.setState({paused: false});
      } else{
        this.video.pause();
        this.setState({paused: true});
      }
    }
  }

  render(){
    return (
      this.state.image ?
      (
        <img src={this.state.image.url} className="post-image"/>
      )
      : this.state.video ?
      (
        <div className="post-video" onClick={()=> this.controlManually()}>
          {
            this.state.paused ?
            (
              <div className="play-icon text-center rounded-circle pl-2 pt-3"
              onClick={()=> this.controlManually()}>
                <i className="fa fa-play fa-3x"/>
              </div>
            ) : null
          }
          <video loop ref={(video) => {this.video = video}} muted playsInline>
            <source src={this.state.video.webm.url} type="video/webm"/>
            <source src={this.state.video.mp4.url} type="video/mp4"/>
          </video>
        </div>
      )
      : null
    );
  }
}
