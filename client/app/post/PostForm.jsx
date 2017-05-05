import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import PostsApi from '../api/PostsApi';

import helper from  '../components/Helper';
import PostFile from  './PostFile';

import ErrorMessage from  '../components/ErrorMessage';

export default class PostSection extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      original: '',
      preview: null,
      loading: false,
      errors: {}
    };
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
        if(resJson.errors.file) pubsub.publish('file-errors', resJson.errors.file)
      } else{
        window.location = "/posts/" + resJson;
      }

    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub.subscribe('file-loading', (msg, data)=>{
      this.setState({loading: data});
    });
  }

  render(){
    return (
      <form onSubmit={this.publish} method="post">
        <div className="modal-body">
          <div className="row">

            <div className="col-sm-12 col-md-10 offset-md-1 mb-3">
              <PostFile errors={this.state.errors}/>
            </div>

            <div className="col-sm-12 col-md-10 offset-md-1">
              <small className="font-weight-bold">crie um título massa pro seu post:</small>
              <div className={"form-group " + (this.state.errors.hasOwnProperty('title') ? "has-danger" : "")}>
                <input value={this.state.title}
                onChange={helper.handleChange.bind(this, 'title')}
                placeholder="Título"
                className="form-control"></input>
                <ErrorMessage message={this.state.errors.title} />
              </div>

              <small className="font-weight-bold">link do autor original (se existir)</small>
              <div className={"form-group mb-0 " + (this.state.errors.hasOwnProperty('original') ? "has-danger" : "")}>
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
          <input type="submit" className="btn btn-success" disabled={this.state.loading} value="Publicar"></input>
        </div>
      </form>
    );
  }
}
