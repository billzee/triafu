import ReactOnRails from 'react-on-rails';

import Api from '../api/CommentsApi';
import CommentsApi from '../api/CommentsApi';

import PostBox from '../components/Post';
import CommentBox from '../components/Comment';


ReactOnRails.register({
  Api,
  CommentsApi,
  PostBox,
  CommentBox
});
