import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import PostsApi from '../api/PostsApi';
import Dropzone from 'react-dropzone'

import helper from  '../components/Helper';

import ErrorMessage from  '../components/ErrorMessage';

export default class PostFile extends Component {
  constructor(props){
    super();
    this.state = {
      imagePreview: null,
      videoPreview: null,
      loading: null,
      fileErrors: []
    };
  }

  async onDrop(files) {
    let fileSize = files[0].size;
    let fileType = files[0].type;
    let filePreview = files[0].preview;

    this.setState({fileErrors: [], loading: true});
    pubsub.publish('file-loading', true);

    if(fileSize < helper.maxFileSize && fileSize > helper.minFileSize){

      if(fileType.startsWith('video')){
        this.setState({videoPreview: filePreview});
      } else if(fileType.startsWith('image')){
        this.setState({
          imagePreview: {backgroundImage: "url('" + filePreview + "')"}
        });
      } else{
        this.setState({
          imagePreview: {backgroundImage: "url('/assets/file_error.svg')"}
        });
      }

      try{
        let res = await PostsApi._upload_file(files[0]);
        let resJson = await res.json();

        console.log(resJson);

        if(resJson.errors){
          this.setState({fileErrors: resJson.errors});
        }

      } catch(error){
        console.log(error);
      }

    } else{
      this.setState({fileErrors: ["O arquivo deve pesar entre 20KB e 10MB"]});
    }

    this.setState({loading: false});
    pubsub.publish('file-loading', false);
  }

  async removeFile(e) {
    if(e) e.preventDefault();
    this.setState({fileErrors: [], loading: true});
    pubsub.publish('file-loading', true);

    try{
      let res = await PostsApi._remove_file();
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        window.location.reload();
      } else{
        this.setState({imagePreview: null, videoPreview: null});
      }

    } catch(error){
      console.log(error);
    }

    this.setState({loading: null});
    pubsub.publish('file-loading', false);
  }

  componentDidMount(){
    pubsub.subscribe('file-errors', (msg, errors)=>{
      this.setState({fileErrors: errors});
    });
    pubsub.subscribe('remove-file', (msg, errors)=>{
      this.removeFile();
    });
  }

  render(){
    let dropzoneRef;
    return (
      <box>
        <Dropzone onDrop={this.onDrop.bind(this)} style={null} ref={(node) => { dropzoneRef = node; }} disableClick={true}
        className={"post-dropzone text-center p-4 " + (this.state.fileErrors.length > 0 ? "has-danger" : "")} activeClassName="active">
          {
            (this.state.imagePreview || this.state.videoPreview) ?
              (
                <div className="row justify-content-center">
                  <div className="col-30 align-self-center mr-1">
                    {
                      this.state.loading === true ?
                        (<div className="text-purple"><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></div>)
                      : this.state.loading === false ?
                        this.state.fileErrors.length > 0 ?
                          (<i className="fa fa-exclamation-triangle fa-2x text-danger"></i>)
                        :
                          (<i className="fa fa-check-square fa-2x text-success"></i>)
                      : null
                    }
                  </div>
                  <div className="col-140 text-center">
                    {
                      this.state.imagePreview ?
                        (<div style={this.state.imagePreview} className="image-preview rounded m-0"/>)
                      : this.state.videoPreview ?
                        (<div className="thumb-video"><video autoPlay loop muted><source src={this.state.videoPreview}/></video></div>)
                      : null
                    }
                  </div>
                  <div className="col-30 align-self-center">
                    {
                      this.state.loading === false && this.props.disableInputs === false ?
                      (<i className="fa fa-trash fa-2x text-danger href" onClick={(e) => this.removeFile(e)}></i>)
                      : null
                    }
                  </div>
                </div>
              )
            :
              (
                <div className="mt-2">
                  <i className="fa fa-file-image-o fa-4x"></i><br/>
                  <button type="button" type="button" onClick={() => { dropzoneRef.open() }}
                  className="btn btn-success text-white mt-3 mb-2">imagem ou vídeo</button><br/>
                  <small><strong>Clique, toque ou arraste</strong></small>
                </div>
              )
          }
        </Dropzone>
        <ErrorMessage message={this.state.fileErrors} />
      </box>
    );
  }
}
