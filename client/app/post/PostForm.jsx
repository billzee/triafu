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
      disableInputs: false,
      submitLabel: 'Publicar',
      errors: {}
    };

    this.publish = this.publish.bind(this);
  }

  async publish(e){
    if (e) e.preventDefault();
    if(this.state.loading) return;
    this.setState({loading: true});
    this.setState({submitLabel: 'Publicando...'});
    this.setState({disableInputs: true});

    pubsub.publish('post-publishing', true);

    try{
      let res = await PostsApi._create(this.state);
      let resJson = await res.json();

      if(resJson.errors){
        this.setState({errors: resJson.errors});
        if(resJson.errors.file) pubsub.publish('file-errors', resJson.errors.file)
      } else if(resJson.reference_id){
        window.location = "/pub/" + resJson.reference_id;
      } else{
        window.location.reload();
      }

    } catch(error){
      console.log(error);
    }

    this.setState({loading: false});
    this.setState({submitLabel: 'Publicar'});
    this.setState({disableInputs: false});
    pubsub.publish('post-publishing', false);
  }

  componentDidMount(){
    pubsub.subscribe('file-loading', (msg, data)=>{
      this.setState({loading: data});
      if (data === true){
        this.setState({submitLabel: 'Convertendo...'});
      } else{
        this.setState({submitLabel: 'Publicar'});
      }
    });
  }

  render(){
    return (
      <form onSubmit={this.publish} method="post">
        <div className="modal-body">
          <div className="row">

            <div className="col-sm-12 col-md-10 offset-md-1 mb-3">
              <PostFile errors={this.state.errors} disableInputs={this.state.disableInputs}/>
            </div>

            <div className="col-sm-12 col-md-10 offset-md-1">
              <small className="font-weight-bold">crie um título massa pro seu post:</small>
              <div className={"form-group " + (this.state.errors.hasOwnProperty('title') ? "has-danger" : "")}>
                <input value={this.state.title}
                onChange={helper.handleChange.bind(this, 'title')}
                disabled={this.state.disableInputs}
                placeholder="Título"
                className="form-control"></input>
                <ErrorMessage message={this.state.errors.title} />
              </div>

              <small className="font-weight-bold">link do autor original (se existir)</small>
              <div className={"form-group mb-0 " + (this.state.errors.hasOwnProperty('original') ? "has-danger" : "")}>
                <input value={this.state.original}
                onChange={helper.handleChange.bind(this, 'original')}
                disabled={this.state.disableInputs}
                placeholder="http://"
                className="form-control"></input>
                <ErrorMessage message={this.state.errors.original} />
              </div>

              <br/>

              <button type="submit" className="btn btn-block btn-success"
              disabled={this.state.loading}>{this.state.submitLabel}</button>
            </div>

          </div>
        </div>

      </form>
    );
  }
}
