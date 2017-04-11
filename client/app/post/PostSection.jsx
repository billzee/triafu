import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import Waypoint from 'react-waypoint';
import PostsApi from '../api/PostsApi';
import PostBox from './PostBox';

export default class PostSection extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], page: '', lastPage: true};
    this._handleEnter = this._handleEnter.bind(this);
  }

  _handleEnter(postId){
    pubsub.publish('show-comments-for-post', postId);
  }

  async componentWillMount(){
    if(this.props.postId){

      try{
        let res = await PostsApi._get(this.props.postId);
        let resJson = await res.json();

        this.setState({
          posts: this.state.posts.concat(resJson.post)
        });

      } catch(error){
        console.log(error);
      }

    } else{

      try{
        let res = await PostsApi._index();
        let resJson = await res.json();

        console.log(resJson);

        this.setState({
          posts: resJson.posts,
          lastPage: resJson.lastPage,
          page: 2
        });

      } catch(error){
        console.log(error);
      }
    }
  }

  async paginatePosts(e){
    if(e) e.preventDefault();

    try{
      let res = await PostsApi._index(this.state.page);
      let resJson = await res.json();

      console.log(resJson);

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
                topOffset="45%"
                bottomOffset="45%"
                onEnter={()=> {this._handleEnter(post.id)}}>
                <div>
                  <PostBox post={post}/>
                </div>
              </Waypoint>
            );
          })
        }

        {
          !this.state.lastPage ? (<Waypoint onEnter={()=> {this.paginatePosts()}} />) : null
        }
      </box>
    );
  }
}


// {
//   !this.state.lastPage ?
//   (
//     <div className="row justify-content-center pb-5">
//       <div className="col w-500 p-0 text-center">
//         <button className="btn btn-primary" onClick={(e) => this.paginatePosts(e)}>
//           Ver mais
//         </button>
//       </div>
//       <div className="col w-150 p-0 ml-3"></div>
//     </div>
//   )
//   : null
// }
