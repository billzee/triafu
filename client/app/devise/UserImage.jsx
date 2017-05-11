import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import Dropzone from 'react-dropzone'

import DeviseApi from '../api/DeviseApi';

import helper from  '../components/Helper';
import ErrorMessage from  '../components/ErrorMessage';

export default class UserImage extends Component {
  constructor(){
    super();
    this.state = {
      image: '',
      loading: false,
      imageErrors: {}
    };
  }

  async componentWillMount(){
    this.setState({loading: true});

    try{
      let res = await DeviseApi._index();
      let resJson = await res.json();

      this.setState({image: resJson.user.image.url});

      console.log(resJson.user.image);

    } catch(error){
      console.log(error);
    }

    this.setState({loading: false});
  }

  async onDrop(files){
    if(this.state.loading) return;
    this.setState({loading: true});

    try{
      let res = await DeviseApi._updateUserImage(files[0]);
      let resJson = await res.json();

      if (resJson.errors){
        this.setState({imageErrors: resJson.errors});
      } else{
        this.setState({image: resJson.image.url});
        window.location.reload();
      }

    } catch(error){
      console.log(error);
    }

    this.setState({loading: false});
  }

  render(){
    let dropzoneRef;
    return(
      <box>
        <h1>Trocar Imagem</h1>
        <hr/>
        <Dropzone onDrop={this.onDrop.bind(this)} style={null} ref={(node) => { dropzoneRef = node; }} disableClick={true}
        className={"user-image-dropzone text-center p-3 " + (this.state.imageErrors.length > 0 ? "has-danger" : "")}>

          <div className="row justify-content-center">
            <div className="col-50 align-self-center">
              {
                this.state.loading === true ?
                  (
                    <div className="text-purple">
                      <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                    </div>
                  )
                : this.state.loading === false ?
                  this.state.imageErrors.length > 0 ?
                    (<i className="fa fa-exclamation-triangle fa-2x text-danger"></i>)
                  :
                    (<i className="fa fa-check-square fa-2x text-success"></i>)
                : null
              }
            </div>

            <div className="col-100 text-center">
              {
                this.state.image ?
                (<img src={this.state.image} className="image rounded-circle"/>)
                : null
              }
            </div>

            <div className="col-80 align-self-center text-right">
              <button type="button" onClick={() => { dropzoneRef.open() }}
              className="btn btn-purple" disabled={this.state.loading}>trocar</button>
            </div>
          </div>
        </Dropzone>
      </box>
    );
  }
}
