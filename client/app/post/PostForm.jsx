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
  	var dropzone = new Dropzone
  	(
  		"#new_media",
  		{
  			headers:
  			{
  				'X-CSRF-Token': ReactOnRails.authenticityToken()
  			},

  			dictDefaultMessage: "Clique ou arraste <br/> (.jpg .gif .png)",
  			maxFilesize: 1,
  			paramName: "media[image]",
  			maxFiles: 1,
  			addRemoveLinks: true,
  			dictRemoveFile: 'Remover',
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
      let res = await PostsApi.create(this.state);
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
            <div width="135px" height="260px" className="rounded dropzone new_media" id="new_media"></div>

            <div className="col">
              <small className="font-weight-bold">Pense em um título massa para o seu post!</small>
              <div className="form-group">
                <TextArea value={this.state.title}
                onChange={helper.handleChange.bind(this, 'title')}
                placeholder="Título" rows="6"/>
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
