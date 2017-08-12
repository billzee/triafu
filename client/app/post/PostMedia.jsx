import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

export default class PostMedia extends Component {
  constructor(props){
    super();
    this.state = {
      isMobile: props.isMobile,
      image: (props.image || null),
      video: (props.video || null),
      loading: true,
      paused: true,
      muted: true
    };

    this.video = null;
  }

  componentDidMount(){
    if(this.video){
      pubsub.subscribe('play-video', (msg, data)=>{
        if(data.postId === this.props.postId){
          this.video.play();
          if(!this.video.paused) this.setState({paused: false});
        } else if(!this.video.paused){
          this.video.pause();
          this.video.currentTime = 0;
          this.setState({paused: true});
        }
      });

      this.video.addEventListener("loadeddata", function(){
        if(this.state.video.hasAudio === null ||
        typeof this.state.video.hasAudio === "undefined"){
          if (this.video.audioTracks && this.video.audioTracks.length > 0){
            this.setState({hasAudio: true});
          } else if (typeof this.video.mozHasAudio !== "undefined"){
            if (this.video.mozHasAudio)
              this.setState({hasAudio: true});
            else
              this.setState({hasAudio: false});
          } else if (typeof this.video.webkitAudioDecodedByteCount !== "undefined"){
            if (this.video.webkitAudioDecodedByteCount > 0){
              this.setState({hasAudio: true});
            } else{
              this.setState({hasAudio: false});
            }
          } else{
            this.setState({hasAudio: false});
          }
        } else{
          this.setState({hasAudio: this.state.video.hasAudio});
        }

        this.stopSpinning();
      }.bind(this));
    }
  }

  controlManually(){
    if(this.video){
      if (this.state.hasAudio){
        if(this.video.muted){
          this.video.muted = false;
          this.setState({muted: false});
        } else{
          this.video.muted = true;
          this.setState({muted: true});
        }

      } else{
        if(this.video.paused){
          this.video.play();
          if(!this.video.paused) this.setState({paused: false});
        } else{
          this.video.pause();
          this.setState({paused: true});
        }

      }
    }
  }

  stopSpinning(){
    this.setState({loading: false});
  }

  render(){
    return (
      this.state.image ?
      (
        <div className="post-image">
          {
            this.state.loading ? (
              <div className="loader">
                <i className="fa fa-spinner fa-pulse fa-4x text-purple fa-fw"/>
              </div>
            ) : null
          }

          { this.state.isMobile ?
            (
              <img src={this.state.image.url}
              onLoad={()=> this.stopSpinning()}
              className={(this.state.loading ? "hidden" : "")}
              onClick={()=> pubsub.publish('show-comments', this.props.postId)}/>
            )
          :
            (
              <img src={this.state.image.url} onLoad={()=> this.stopSpinning()}
              className={(this.state.loading ? "hidden" : "")}/>
            )
          }
        </div>
      )
      : this.state.video ?
      (
        <div className="post-video" onClick={()=> this.controlManually()}>
          {
            this.state.loading ? (
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

          {
            this.state.hasAudio ?
            (
              this.state.muted ?
                (
                  <div className="sound-icon text-center rounded-circle">
                    <i className="fa fa-volume-off fa-2x"/>
                  </div>
                )
              :
              (
                <div className="sound-icon text-center rounded-circle">
                  <i className="fa fa-volume-up fa-2x"/>
                </div>
              )
            ) : null
          }

          <video ref={(video) => {this.video = video}} muted loop playsInline
          poster={this.state.video.screenshot}>
            <source src={this.state.video.versions.mp4.url} type="video/mp4"/>
            <source src={this.state.video.versions.webm.url} type="video/webm"/>
          </video>
        </div>
      )
      : null
    );
  }
}
