import React, { PropTypes } from 'react';

export default class Comment extends React.Component {

  constructor(_railsContext) {
    super();
    this.state = {comments: []};
  }

  componentWillMount(){
    fetch('/comments')
      .then((response) => response.json())
      .then((res) => {
        console.log('will');
        this.setState({comments: res});
        console.log('set');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="col-12">
        {
          this.state.comments.map(function(comment){
            return(
              <div>
                <div className="row">
                  <div className="col-2 pr-0 mt-2">
                    <div className="float-right white"></div>
                  </div>
                  <div className="col pt-2">
                    <p>Guilherme Zordan</p>
                    {comment.text}
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
          })
        }
      </div>
      )
  }
}
