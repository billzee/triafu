import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class PostShareLinks extends Component {
  constructor(props){
    super();
    this.state = {postUrl: ''};
  }

  componentDidMount(){
    let postUrl = window.location.host + '/posts/' + this.props.post.id;
    this.setState({postUrl: postUrl});
  }

  render(){
    return (
      <div className="row">
        <div className="col-5 pr-0">
          <CopyToClipboard
            text={this.state.postUrl}
            onCopy={() => {
              let copyBtn = $('[data-toggle='+this.props.post.id+']');
              copyBtn.tooltip({trigger: 'manual'});
              copyBtn.tooltip('show');
              setTimeout(()=>{ copyBtn.tooltip('hide'); }, 3000);
            }}>
            <button className="btn btn-sm btn-block btn-success"
            data-toggle={this.props.post.id}
            data-placement="bottom" data-title="Copiado!">
              <i className="fa fa-clipboard fa-1x"></i>
              <span className="ml-1">Copiar Link</span>
            </button>
          </CopyToClipboard>
        </div>
        <div className="col-3 pl-1 pr-0">
          <button className="btn btn-sm btn-block btn-facebook">
            <i className="fa fa-facebook-f fa-1x"></i>
            <span className="ml-1">Facebook</span>
          </button>
        </div>
        <div className="col-4 pl-1">
          <button className="btn btn-sm btn-block btn-twitter">
            <i className="fa fa-twitter fa-1x"></i>
            <span className="ml-1">Twitter</span>
          </button>
        </div>
      </div>
    );
  }
}
