import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class Categories extends Component {
  constructor(){
    super();
    this.state = {selected: "top"};
  }

  changeCategory(e, category){
    e.preventDefault();
    this.setState({selected: category});
    pubsub.publish('category', category);
  }

  render(){
    return(
      <div className="col pt-3">
        <ul className="list-inline list-unstyled mb-0">
          <li className="list-inline-item header-item active">
            <a href className={"header-link " + (this.state.selected === 'top' ? "active" : "")}
            onClick={(e) => this.changeCategory(e, "top")}>Top</a>
          </li>
          <li className="list-inline-item header-item">
            <a href className={"header-link " + (this.state.selected === 'newcomer' ? "active" : "")}
            onClick={(e) => this.changeCategory(e, "newcomer")}>Novas</a>
          </li>
          <li className="list-inline-item dropdown header-item">
            <a href="#" className="dropdown-toggle header-link" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tudo
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdown01">
              <a className="dropdown-item" href="#">Ver<img src="/assets/funny.svg" width="35px" className="mr-2 ml-2" />1º</a>
              <a className="dropdown-item" href="#">Ver<img src="/assets/brain.svg" width="35px" className="mr-2 ml-2" />1º</a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
