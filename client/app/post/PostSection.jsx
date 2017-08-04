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
      loading: false,
      lastPage: true
    };

    this.getPosts = this.getPosts.bind(this);
    this.showPost = this.showPost.bind(this);
  }

  _handleEnter(postId, postAuthor, postReferenceId){
    pubsub.publish('watch-post', {postId: postId, postAuthor: postAuthor, postReferenceId: postReferenceId});
    pubsub.publish('play-video', {postId: postId});
    this.setState({currentPost: postId, currentPostAuthor: postAuthor});
  }

  _playVideo(postId){
    pubsub.publish('play-video', {postId: postId});
  }

  async showPost(){
    if(this.state.loading) return;
    this.setState({loading: true});

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

    this.setState({loading: false});
  }

  async getPosts(e, category=(this.props.category || "top"), username=(this.props.username || "")){
    if(e)e.preventDefault();
    if(this.state.loading) return;
    this.setState({loading: true});

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

    this.setState({loading: false});
  }

  componentWillMount(){
    if(this.state.postReferenceId)
      this.showPost();
    else
      this.getPosts();
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
  }

  render(){
    if(this.props.isMobile){
      return(
        <box>
          { this.state.posts.map((post)=>{
              return(
                <Waypoint
                  key={post.id}
                  topOffset="49%"
                  bottomOffset="49%"
                  onEnter={()=> {this._playVideo(post.id)}}>
                  <div>
                    <PostBox
                    post={post}
                    currentPost={this.state.currentPost}
                    isMobile={this.state.isMobile} />
                  </div>
                </Waypoint>
              );
            })
          }

          { !this.state.loading && this.state.posts.length === 0 ?
            (
              <div className="row pb-4 pt-3 no-gutters">
                <div className="col-12 text-center">
                  Nenhuma publicação aqui <br/>
                  <button className="btn btn-success" data-toggle="modal" data-target="#m_new_post">
                    Criar publicação
                  </button>
                </div>
              </div>
            ) : null }

          { this.state.postReferenceId ? (
              <div className="row pb-4 no-gutters">
                <div className="col-10 offset-1">
                  <button type="button" onClick={(e) => this.getPosts(e)}
                  className="btn btn-block btn-primary">
                    Carregar mais publicações
                  </button>
                </div>
              </div>
            ) : null }

          { this.state.loading === true ? (
            <div className="row pb-3 pt-3 no-gutters">
              <div className="col-10 offset-1 text-purple text-center">
                <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
              </div>
            </div> ) : null }

          {!this.state.lastPage ? (<Waypoint onEnter={()=> {this.getPosts()}} />) : null}
        </box>
      );
    } else{
      return(
        <box>
          { this.state.posts.map((post)=>{
              return(
                <Waypoint
                  key={post.id}
                  topOffset="49%"
                  bottomOffset="49%"
                  onEnter={()=> {this._handleEnter(post.id, post.userId, post.referenceId)}}>
                  <div>
                    <PostBox post={post}
                    currentPost={this.state.currentPost}
                    isMobile={this.state.isMobile} />
                  </div>
                </Waypoint>
              );
            })
          }

          { !this.state.loading && this.state.posts.length === 0 ? (
            <div className="text-center mt-4">
              Nenhuma publicação aqui <br/>
              <button className="btn btn-success mt-1"
              data-toggle="modal" data-target="#m_new_post">
                Criar publicação
              </button>
            </div>
          ) : null }

          { this.state.postReferenceId ? (
            <button type="button" onClick={(e) => this.getPosts(e)}
            className="btn btn-block btn-primary mt-4 mb-4">
              Carregar mais publicações
            </button>) : null
          }

          { this.state.loading === true ? (
            <div className="text-center text-purple mt-3 mb-3">
              <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            </div>
            ) : null }

          { !this.state.lastPage ? (<Waypoint onEnter={()=> {this.getPosts()}} />) : null }
        </box>
      );
    }
  }

  componentWillUnmount() {
    this.setState({loading: true});
  }
}
