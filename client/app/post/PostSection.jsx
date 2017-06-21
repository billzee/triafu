import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import Waypoint from 'react-waypoint';

import CommentSection from '../comment/CommentSection';
import PostsApi from '../api/PostsApi';
import PostBox from './PostBox';

export default class PostSection extends Component {
  constructor(props){
    super();
    this.state = {
      postReferenceId: props.postReferenceId,
      isMobile: (props.isMobile || false),
      currentPost: props.postId,
      currentPostAuthor: '',
      posts: [],
      sortBy: '',
      page: 1,
      showCommentSection: false,
      lastPage: true
    };

    this._handleEnter = this._handleEnter.bind(this);
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
  }

  _handleEnter(postId, postAuthor){
    pubsub.publish('watch-post', {postId: postId, postAuthor: postAuthor});
    this.setState({currentPost: postId, currentPostAuthor: postAuthor});
  }

  async show(){
    try{
      let res = await PostsApi._show(this.state.postReferenceId);
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

  async index(category=(this.props.category || "top"), username=(this.props.username || "")){
    try{
      let res = await PostsApi._index(null, category, username);
      let resJson = await res.json();

      var sortedPosts;
      if(this.state.sortBy){
        sortedPosts = resJson.posts.sort(
          function(a, b){
            return b[this.state.sortBy] - a[this.state.sortBy];
          }.bind(this)
        )
      }

      this.setState({
        posts: (sortedPosts || resJson.posts),
        lastPage: resJson.lastPage,
        page: 2
      });

    } catch(error){
      console.log(error);
    }
  }

  async paginatePosts(e, category=(this.props.category || "top"), username=(this.props.username || "")){
    if(e) e.preventDefault();

    try{
      if(this.state.postReferenceId) this.setState({postReferenceId: null});

      let res = await PostsApi._index(this.state.page, category, username);
      let resJson = await res.json();

      var sortedPosts;
      if(this.state.sortBy){
        sortedPosts = resJson.posts.sort(
          function(a, b){
            return b[this.state.sortBy] - a[this.state.sortBy];
          }.bind(this)
        )
      }

      this.setState({
        posts: this.state.posts.concat(sortedPosts || resJson.posts),
        lastPage: resJson.lastPage,
        page: 1 + this.state.page
      });

    } catch(error){
      console.log(error);
    }
  }

  componentWillMount(){
    if(this.state.postReferenceId){
      this.show();
    } else{
      this.index();
    }
  }

  componentDidMount(){
    pubsub.subscribe('category', (msg, category)=>{
      this._index(category);
    });

    pubsub.subscribe('sort-by', (msg, sortBy)=>{
      this.setState({sortBy: sortBy});
      if(this.state.posts.length > 0){
        let sortedPosts = this.state.posts.sort(
          function(a, b){
            return b[this.state.sortBy] - a[this.state.sortBy];
          }.bind(this)
        )

        this.setState({posts: sortedPosts})
      }
    });

    pubsub.subscribe('toggle-comment-section', (msg, toggle)=>{
      console.log('received');
      this.setState({showCommentSection: toggle})
    });
  }

  render(){
    if(this.props.isMobile){
      return(
        <box>
          {
            this.state.posts.map((post)=>{
              return(
                <PostBox
                key={post.id}
                post={post}
                currentPost={this.state.currentPost}
                isMobile={this.state.isMobile} />
              );
            })
          }
          {
            this.state.postReferenceId ?
            (
              <div className="row pb-4 no-gutters">
                <div className="col-10 offset-1">
                  <button type="button" onClick={(e) => this.paginatePosts(e)}
                  className="btn btn-block btn-primary">
                    Carregar mais publicações
                  </button>
                </div>
              </div>
            ) : null
          }
          { !this.state.lastPage ? (<Waypoint onEnter={()=> {this.paginatePosts()}} />) : null }
        </box>
      );
    } else{
      return(
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
                  <PostBox post={post}
                  currentPost={this.state.currentPost}
                  isMobile={this.state.isMobile} />
                </div>
              </Waypoint>
            );
          })
        }
        {
          this.state.postReferenceId ?
          (
            <div className="row justify-content-end mr-5">
              <div className="col-700">
                <div className="col-550">
                  <button type="button" onClick={(e) => this.paginatePosts(e)}
                  className="btn btn-block btn-primary">
                    Carregar mais publicações
                  </button>
                </div>
              </div>
            </div>
            ) : null
          }
          { !this.state.lastPage ? (<Waypoint onEnter={()=> {this.paginatePosts()}} />) : null }
        </box>
      );
    }
  }
}
