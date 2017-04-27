import React, { Component } from 'react';

import PostsApi from '../api/PostsApi';
import Dropzone from 'react-dropzone'

export default class PostDropzone extends Component {
  constructor(){
    super();
    this.state = {preview: null, loading: null, errors: {}};
  }

  async onDrop(files) {
    try{
      this.setState({
        preview: {backgroundImage: "url('" + files[0].preview + "')"},
        loading: true
      });

      let res = await PostsApi._upload_media(files[0]);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      } else{
        this.setState({loading: false});
      }

    } catch(error){
      console.log(error);
    }
  }

  async removeFile(e) {
    if(e) e.preventDefault();

    try{
      let res = await PostsApi._remove_media();
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      } else{
        this.setState({preview: null, loading: null});
      }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <Dropzone onDrop={this.onDrop.bind(this)} style={null} className="post-dropzone text-center p-4">
        {
          this.state.preview ?
          (
            <div className="row justify-content-center">
              <div className="col-30 align-self-center">
                {
                  this.state.loading === true ?
                  (<i className="fa fa-refresh fa-spin fa-2x text-info"></i>)
                  : this.state.loading === false ?
                  (<i className="fa fa-check-square fa-2x text-success"></i>)
                  : null
                }
              </div>
              <div className="col-150 text-center">
                <div style={this.state.preview} className="preview rounded m-0"/>
              </div>
              <div className="col-30 align-self-center" onClick={(e) => this.removeFile(e)}>
                <i className="fa fa-trash fa-2x text-danger"></i>
              </div>
            </div>
          )
          :
          (
            <div className="mt-2">
              <i className="fa fa-file-image-o fa-4x text-purple"></i><br/>
              <button type="button" className="btn btn-success text-white mt-3 mb-2">imagem ou vídeo</button><br/>
              <small><strong className="text-purple">Clique, toque ou arraste</strong></small>
            </div>
          )
        }
      </Dropzone>
    );
  }
}
