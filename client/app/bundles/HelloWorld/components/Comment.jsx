import React, { PropTypes } from 'react';

export default class Comment extends React.Component {

  constructor(_railsContext) {
    super();
    this.state = { name: "Gui" };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-2 pr-0 mt-2">
            <div className="float-right white"></div>
          </div>
          <div className="col pt-2">
            <p>Guilherme Zordan</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-right c-white">
            <span className="glyphicon glyphicon-arrow-up mr-2"></span>
            <span className="glyphicon glyphicon-arrow-down mr-2"></span>
            <a href="#" className="c-white">responder</a>
          </div>
        </div>
      </div>
    );
  }
}
