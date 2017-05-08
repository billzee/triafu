import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class Categories extends Component {
  constructor(){
    super();
    this.state = {selected: "top", sortBy: ''};
  }

  changeCategory(e, category){
    e.preventDefault();
    this.setState({selected: category});
    pubsub.publish('category', category);
  }

  sortBy(e, sortBy){
    e.preventDefault();
    this.setState({sortBy: sortBy});
    pubsub.publish('sort-by', sortBy);
  }

  render(){
    return(
      <div className="col pt-2">
        <ul className={"list-inline list-unstyled mb-0 " + (this.state.sortBy === '' ? "mt-15" : "")}>
          <li className="list-inline-item header-item active">
            <a href className={"header-link " + (this.state.selected === 'top' ? "active" : "")}
            onClick={(e) => this.changeCategory(e, "top")}>Top</a>
          </li>
          <li className="list-inline-item header-item">
            <a href className={"header-link " + (this.state.selected === 'newcomer' ? "active" : "")}
            onClick={(e) => this.changeCategory(e, "newcomer")}>Novas</a>
          </li>
          <li className="list-inline-item dropdown header-item">
            {
              this.state.sortBy === "funnyCount" ?
              (
                <a href className="dropdown-toggle header-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="/assets/funny.svg" height="35px" />
                </a>
              ) : this.state.sortBy === "smartCount" ?
              (
                <a href className="dropdown-toggle header-link p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="/assets/brain.svg" height="35px" />
                </a>
              ) :
              (
                <a href className="dropdown-toggle header-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tudo
                </a>
              )
            }
            <div className="dropdown-menu">
              {
                this.state.sortBy !== "funnyCount" ?
                (
                  <a className="dropdown-item" href onClick={(e) => this.sortBy(e, "funnyCount")}>
                    Ver<img src="/assets/funny.svg" width="35px" className="mr-2 ml-2" />1º
                  </a>
                ) : null
              }
              {
                this.state.sortBy !== "smartCount" ?
                (
                  <a className="dropdown-item" href onClick={(e) => this.sortBy(e, "smartCount")}>
                    Ver<img src="/assets/brain.svg" width="35px" className="mr-2 ml-2" />1º
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
          </li>
        </ul>
      </div>
    );
  }
}
