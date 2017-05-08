import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import Waypoint from 'react-waypoint';
import PostsApi from '../api/PostsApi';
import PostBox from './PostBox';

export default class PostSection extends Component {
  constructor(props){
    super();
    this.state = {
      posts: [],
      postId: props.postId,
      currentPost: props.postId,
      sortBy: '',
      page: '',
      lastPage: true
    };

    this._handleEnter = this._handleEnter.bind(this);
    this._index = this._index.bind(this);
  }

  _handleEnter(postId, postAuthor){
    pubsub.publish('watch-post', {postId: postId, postAuthor: postAuthor});
    this.setState({currentPost: postId});
  }

  async show(){
    try{
      let res = await PostsApi._show(this.state.postId);
      let resJson = await res.json();

      this.setState({
        posts: this.state.posts.concat(resJson.post),
        lastPage: true,
        page: 1
      });

    } catch(error){
      console.log(error);
    }
  }

  async _index(category="top"){
    try{
      let res = await PostsApi._index(category);
      let resJson = await res.json();

      console.log(resJson.posts);

      var sortedPosts;
      if(this.state.sortBy){
        sortedPosts = resJson.posts.sort(
          function(a, b){
            return b[this.state.sortBy] - a[this.state.sortBy];
          }.bind(this)
        )
      }

      console.log(sortedPosts, " sorted postssss");

      this.setState({
        posts: (sortedPosts || resJson.posts),
        lastPage: resJson.lastPage,
        page: 2
      });

    } catch(error){
      console.log(error);
    }
  }

  componentWillMount(){
    if(this.state.postId){
      this.show();
    } else{
      this._index();
    }
  }

  componentDidMount(){
    pubsub.subscribe('category', (msg, category)=>{
      this.index(category);
    });
    pubsub.subscribe('sort-by', (msg, sortBy)=>{
      this.setState({sortBy: sortBy});
      this._index();
    });
  }

  async paginatePosts(e){
    if(e) e.preventDefault();
    console.log('caindo na paginacao?');

    try{
      if(this.state.postId) this.setState({postId: null});

      let res = await PostsApi._index(this.state.page);
      let resJson = await res.json();

      this.setState({
        posts: this.state.posts.concat(resJson.posts),
        lastPage: resJson.lastPage,
        page: 1 + this.state.page
      });

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <box>
        {
          this.state.posts.map((post)=>{
            return(
              <Waypoint
                key={post.id}
                topOffset="49%"
                bottomOffset="49%"
                onEnter={()=> {this._handleEnter(post.id, post.userId)}}>
                <div>
                  <PostBox post={post} currentPost={this.state.currentPost} />
                </div>
              </Waypoint>
            );
          })
        }

        {
          this.state.postId ?
          (
            <div className="row justify-content-center pb-5">
              <div className="col-700">
                <div className="col-550">
                  <button type="button" className="btn btn-block btn-primary" onClick={(e) => this.paginatePosts(e)}>
                    Carregar mais publicações
                  </button>
                </div>
              </div>
            </div>
          )
          : null
        }

        { !this.state.lastPage ? (<Waypoint onEnter={()=> {this.paginatePosts()}} />) : null }

      </box>
    );
  }
}
