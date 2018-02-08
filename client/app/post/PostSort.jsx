import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class PostSort extends Component {
  constructor(){
    super();
    this.state = {selected: "top", sortBy: ''};
  }

  sortBy(e, sortBy){
    e.preventDefault();
    this.setState({sortBy: sortBy});
    pubsub.publish('sort-by', sortBy);

    var posts = document.getElementById('posts');
    if(posts){
      posts.scrollTop = 0;
    } else{
      window.scrollTo(0, 0);
    }
  }

  render(){
    return(
      <div className={"dropdown " + (this.state.sortBy === '' ? "pt-text" : "pt-icon")}>
        {
          this.state.sortBy === "funnyCount" ?
          (
            <a href className="dropdown-toggle header-link p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="/assets/icons/funny.svg" height="32" /> 1º
            </a>
          ) : this.state.sortBy === "smartCount" ?
          (
            <a href className="dropdown-toggle header-link p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="/assets/icons/brain.svg" height="32" /> 1º
            </a>
          ) :
          (
            <a href className="dropdown-toggle header-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tudo
            </a>
          )
        }
        <div className="dropdown-menu dropdown-menu-left">
          {
            this.state.sortBy !== "funnyCount" ?
            (
              <a className="dropdown-item" href onClick={(e) => this.sortBy(e, "funnyCount")}>
                Ver<img src="/assets/icons/funny.svg" width="32px" className="mr-2 ml-2" />1º
              </a>
            ) : null
          }
          {
            this.state.sortBy !== "smartCount" ?
            (
              <a className="dropdown-item" href onClick={(e) => this.sortBy(e, "smartCount")}>
                Ver<img src="/assets/icons/brain.svg" width="35px" className="mr-2 ml-2" />1º
              </a>
            ) : null
          }
          {
            this.state.sortBy !== "" ?
            (
              <a className="dropdown-item" href onClick={(e) => this.sortBy(e, "")}>
                Ver Tudo
              </a>
            ) : null
          }
        </div>
      </div>
    );
  }
}
