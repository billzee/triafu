import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class PostShareLinks extends Component {
  constructor(props) {
    super();
    this.state = {postUrl: ''};
  }

  componentDidMount(){
    let postUrl = window.location.host + '/posts/' + this.props.post.id;
    this.setState({postUrl: postUrl});
  }

  render(){
    return (
      <div className="col-7 text-right">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <CopyToClipboard
              text={this.state.postUrl}
              onCopy={() => {
                let copyBtn = $('[data-toggle='+this.props.post.id+']');
                copyBtn.tooltip({trigger: 'manual'});
                copyBtn.tooltip('show');
                setTimeout(()=>{ copyBtn.tooltip('hide'); }, 3000);
              }}>
              <button className="btn btn-sm btn-success" data-toggle={this.props.post.id} data-placement="bottom" data-title="Copiado!">
                <i className="fa fa-clipboard fa-1x"></i>
                <span className="ml-1">Copiar Link</span>
              </button>
            </CopyToClipboard>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-sm btn-facebook">
              <i className="fa fa-facebook-f fa-1x"></i>
              <span className="ml-1">Facebook</span>
            </button>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-sm btn-twitter">
              <i className="fa fa-twitter fa-1x"></i>
              <span className="ml-1">Twitter</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
