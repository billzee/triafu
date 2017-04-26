import React, { Component } from 'react';

import PostsApi from '../api/PostsApi';

import helper from  '../components/Helper';

// import PostDropzone from  './PostDropzone';

import Dropzone from 'react-dropzone'

import ErrorMessage from  '../components/ErrorMessage';

export default class PostSection extends Component {
  constructor(){
    super();
    this.state = {title: '', original: '', preview: null, errors: {}};
    this.publish = this.publish.bind(this);
  }

  async publish(e){
    e.preventDefault();

    try{
      let res = await PostsApi._create(this.state);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      }

      // window.location = "/posts/" + resJson;
    } catch(error){
      console.log(error);
    }
  }

  async onDrop(files) {
    try{
      let res = await PostsApi._upload_media(files[0]);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      } else{
        this.setState({preview: files[0].preview});
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
        this.setState({preview: null});
      }

    } catch(error){
      console.log(error);
    }
  }


  render(){
    return (
      <form onSubmit={this.publish} method="post">
        <div className="modal-body">
          <div className="row">

            <div className="col-sm-12 col-md-10 offset-md-1 mb-4">
                <Dropzone onDrop={this.onDrop.bind(this)} style={null} className="post-dropzone text-center p-4">
                {
                  this.state.preview ?
                  (
                    <div className="row justify-content-center">
                      <div className="col-170">
                        <img src={this.state.preview} className="rounded"/>
                      </div>
                      <div className="col-fa align-self-center text-center"
                      onClick={(e) => this.removeFile(e)}>
                        <i className="fa fa-trash fa-2x text-danger float-right"></i>
                      </div>
                    </div>
                  )
                  :
                  (
                    <div className="mt-2">
                      <i className="fa fa-file-image-o fa-4x text-purle"></i><br/>
                      <button type="button" className="btn btn-success text-white mt-3 mb-2">imagem ou vídeo</button><br/>
                      <small>Clique, toque ou arraste.</small>
                    </div>
                  )
                }
              </Dropzone>
              <ErrorMessage message={this.state.errors.media} />
            </div>

            <div className="col-sm-12 col-md-10 offset-md-1">
              <small className="font-weight-bold">Crie um título massa para o seu post:</small>
              <div className={"form-group " + (this.state.errors.hasOwnProperty('title') ? "has-danger" : "")}>
                <input value={this.state.title}
                onChange={helper.handleChange.bind(this, 'title')}
                placeholder="Título"
                className="form-control"></input>
                <ErrorMessage message={this.state.errors.title} />
              </div>

              <small className="font-weight-bold">URL do autor original (se existir)</small>
              <div className={"form-group " + (this.state.errors.hasOwnProperty('original') ? "has-danger" : "")}>
                <input value={this.state.original}
                onChange={helper.handleChange.bind(this, 'original')}
                placeholder="http://"
                className="form-control"></input>
                <ErrorMessage message={this.state.errors.original} />
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <input type="submit" className="btn btn-success" value="Publicar"></input>
        </div>
      </form>
    );
  }
}
