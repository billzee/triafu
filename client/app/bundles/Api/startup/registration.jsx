import ReactOnRails from 'react-on-rails';
import api from '../components/Api';

import CommentBox from '../components/Comment';
import PostBox from '../components/Post';

ReactOnRails.register({
  api,
  PostBox,
  CommentBox
});
