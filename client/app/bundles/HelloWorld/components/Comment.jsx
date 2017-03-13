import React, { PropTypes } from 'react';

export default class Comment extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(_railsContext) {
    super();
    this.state = { name: "Gui" };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <h3 className="c-white">
          Hello, {this.state.name}!
        </h3>
      </div>
    );
  }
}
