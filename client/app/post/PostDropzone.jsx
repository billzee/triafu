import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import PostsApi from '../api/PostsApi';
import Dropzone from 'react-dropzone'

import helper from  '../components/Helper';

import ErrorMessage from  '../components/ErrorMessage';

export default class PostDropzone extends Component {
  constructor(props){
    super();
    this.state = {imagePreview: null, videoPreview: null, loading: null, fileErrors: []};
  }

  async onDrop(files) {
    let fileSize = files[0].size;
    let fileType = files[0].type;
    let filePreview = files[0].preview;

    if(fileSize < helper.maxFileSize && fileSize > helper.minFileSize){
      this.setState({fileErrors: [], loading: true});

      if(fileType.startsWith('video')){
        this.setState({videoPreview: filePreview});
      } else if(fileType.startsWith('image')){
        this.setState({
          imagePreview: {backgroundImage: "url('" + filePreview + "')"}
        });
        if(fileType === 'image/gif'){
          console.log(files[0]);
        }
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
          this.setState({fileErrors: resJson.errors, loading: false});
        } else{
          this.setState({loading: false});
        }

      } catch(error){
        console.log(error);
      }

    } else{
      this.setState({fileErrors: ["O arquivo deve pesar entre 20KB e 10MB"], loading: false});
    }
  }

  async removeFile(e) {
    if(e) e.preventDefault();

    try{
      let res = await PostsApi._remove_file();
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({fileErrors: resJson.errors, loading: null});
      } else{
        this.setState({imagePreview: null, videoPreview: null, loading: null});
      }

    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub.subscribe('file-errors', (msg, errors)=>{
      this.setState({fileErrors: errors});
    });
  }

  render(){
    let dropzoneRef;
    return (
      <box>
        <Dropzone onDrop={this.onDrop.bind(this)} style={null} ref={(node) => { dropzoneRef = node; }} disableClick={true}
        className={"post-dropzone text-center p-4 " + (this.state.fileErrors.length > 0 ? "has-danger" : "")}>
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
                  <div className="col-150 text-center">
                    {
                      this.state.imagePreview ?
                        (<div style={this.state.imagePreview} className="image-preview rounded m-0"/>)
                      : this.state.videoPreview ?
                        (<video width="150" height="150" autoPlay loop><source src={this.state.videoPreview}/></video>)
                      : null
                    }
                  </div>
                  <div className="col-30 align-self-center">
                    <i className="fa fa-trash fa-2x text-danger href"
                    onClick={(e) => this.removeFile(e)}></i>
                  </div>
                </div>
              )
            :
              (
                <div className="mt-2">
                  <i className="fa fa-file-image-o fa-4x text-purple"></i><br/>
                  <button type="button" type="button" onClick={() => { dropzoneRef.open() }}
                  className="btn btn-success text-white mt-3 mb-2">imagem ou vídeo</button><br/>
                  <small><strong className="text-purple">Clique, toque ou arraste</strong></small>
                </div>
              )
          }
        </Dropzone>
        <ErrorMessage message={this.state.fileErrors} />
      </box>
    );
  }
}
