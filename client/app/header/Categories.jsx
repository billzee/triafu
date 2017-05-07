import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class Categories extends Component {
  changeCategory(e, category){
    e.preventDefault();
    pubsub.publish('category', category);
  }

  render(){
    return(
      <div className="col pt-3">
        <ul className="list-inline list-unstyled mb-0">
          <li className="list-inline-item header-item active">
            <a href className="header-link"
            onClick={(e) => this.changeCategory(e, 1)}>Top</a>
          </li>
          <li className="list-inline-item header-item">
            <a href className="header-link"
            onClick={(e) => this.changeCategory(e, 2)}>Novos</a>
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
