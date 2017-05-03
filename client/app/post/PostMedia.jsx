import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {
      imageUrl: (props.imageUrl || null),
      videoUrl: (props.videoUrl || null),
      paused: true
    };
  }

  componentDidMount(){
    if(this.state.videoUrl){
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
    }
  }

  controlManually(){
    if (this.video.paused){
      this.video.play()
      this.setState({paused: false});
    } else{
      this.video.pause()
      this.setState({paused: true});
    }
  }

  render(){
    return (
      this.state.imageUrl ?
      (
        <img src={this.state.imageUrl} className="post-media"/>
      )
      : this.state.videoUrl ?
      (
      <div className="post-media">
      {
        this.state.paused ?
        (
          <div className="play-icon text-center rounded-circle pl-2 pt-3"
          onClick={()=> this.controlManually()}>
            <i className="fa fa-play fa-3x"/>
          </div>
        ) : null
      }

        <video loop ref={(video) => {this.video = video}} onClick={()=> this.controlManually()}>
          <source src={this.state.videoUrl}/>
        </video>
      </div>
      )
      : null

    );
  }
}
