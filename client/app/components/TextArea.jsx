import React, { Component } from 'react';

export default class TextArea extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <box>
        <textarea {...this.props} className="form-control w-100 mb-2"></textarea>
        <ul className="list-unstyled list-inline float-right">
          <li className="list-inline-item">
            <input type="button" className="btn btn-secondary btn-sm" value=".gif"></input>
          </li>
          <li className="list-inline-item">
            <input type="submit" className="btn btn-success btn-sm" value="Comentar"></input>
          </li>
        </ul>
      </box>
    );
  }
}
