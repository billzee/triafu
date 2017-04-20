import ReactOnRails from 'react-on-rails';

import PostSection from '../post/PostSection';
import PostForm from '../post/PostForm';
import PostBox from '../post/PostBox';

import CommentSection from '../comment/CommentSection';

import Login from '../sessions/Login';

var moment = require('moment');
moment.locale('pt-BR');

ReactOnRails.register({
  PostSection,
  PostForm,
  PostBox,
  CommentSection,
  Login
});
