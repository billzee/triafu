import React, { Component } from 'react';

import PostsApi from '../api/PostsApi';
import helper from  '../components/Helper';
import TextArea from  '../components/TextArea';

export default class PostSection extends Component {
  constructor() {
    super();
    this.state = {title: '', original: ''};
    this.publish = this.publish.bind(this);
    Dropzone.autoDiscover = false;
  }

  componentDidMount(){
    var dropzoneDescription = '<i class="fa fa-file-image-o fa-4x"></i><br/>'+
    '<button type="button" class="btn btn-success text-white mt-3 mb-2">imagem ou vídeo</button><br/>'+
    '<small>.jpg .png .gif</small><br/>'+
    '<small>.mpg .mp4 .avi</small>'

  	var dropzone = new Dropzone
  	(
  		"#new_media",
  		{
  			headers:
  			{
  				'X-CSRF-Token': ReactOnRails.authenticityToken()
  			},

  			dictDefaultMessage: dropzoneDescription,
  			maxFilesize: 1,
  			paramName: "media[image]",
  			maxFiles: 1,
  			addRemoveLinks: true,
  			dictRemoveFile: 'Escolher outra',
  			clickable: true,
  			method: 'post',
  		  url: '/post/upload_media',
  			uploadMultiple: false
  		}
  	);
  }

  async publish(e){
    e.preventDefault();

    try{
      let res = await PostsApi._create(this.state);
      let resJson = await res.json();

      window.location = "/posts/" + resJson;
    } catch(error){
      window.location.reload();
      console.log(error);
    }
  }

  render(){
    return (
      <form onSubmit={this.publish} method="post">
        <div className="modal-body">
          <div className="row">

            <div className="col-sm-12 col-md-10 offset-md-1 mb-4">
              <div className="dropzone new_media" id="new_media" />
            </div>

            <div className="col-sm-12 col-md-10 offset-md-1">
              <small className="font-weight-bold">Pense em um título massa para o seu post:</small>
              <div className="form-group">
                <input value={this.state.title}
                onChange={helper.handleChange.bind(this, 'title')}
                placeholder="Título"
                className="form-control"></input>
              </div>

              <small className="font-weight-bold">URL do autor original (se houver)</small>
              <div className="form-group">
                <input value={this.state.original}
                onChange={helper.handleChange.bind(this, 'original')}
                placeholder="http://"
                className="form-control"></input>
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
