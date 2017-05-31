import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {
      image: (props.image || null),
      video: (props.video || null),
      waiting: true,
      paused: true
    };

    this.video = null;
  }

  componentDidMount(){
    if(this.video){
      pubsub.subscribe('watch-post', (msg, data)=>{
        if(data.postId === this.props.postId){
          this.video.play();
          this.setState({paused: false});
        } else if(!this.video.paused){
          this.video.pause();
          this.video.currentTime = 0;
          this.setState({paused: true});
        }
      });

      this.video.addEventListener("loadeddata", function() {
        this.stopSpinning();
      }.bind(this));
    }
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

  stopSpinning(){
    this.setState({waiting: false});
  }

  render(){
    return (
      this.state.image ?
      (
        <div className="post-image">
          {
            this.state.waiting ? (
              <div className="loader">
                <i className="fa fa-spinner fa-pulse fa-4x text-purple fa-fw"/>
              </div>
            ) : null
          }

          <img src={this.state.image.url} onLoad={()=> this.stopSpinning()}
          className={(this.state.waiting ? "hidden" : "")}/>
        </div>
      )
      : this.state.video ?
      (
        <div className="post-video" onClick={()=> this.controlManually()}>
          {
            this.state.waiting ? (
              <div className="loader">
                <i className="fa fa-spinner fa-pulse fa-4x text-purple fa-fw"/>
              </div>
            ) : null
          }

          {
            this.state.paused ?
            (
              <div className="play-icon text-center rounded-circle pl-2 pt-3">
                <i className="fa fa-play fa-3x"/>
              </div>
            ) : null
          }

          <video ref={(video) => {this.video = video}} loop muted playsInline preload="yes">
            <source src={this.state.video.mp4.url} type="video/mp4"/>
            <source src={this.state.video.webm.url} type="video/webm"/>
          </video>
        </div>
      )
      : null
    );
  }
}
