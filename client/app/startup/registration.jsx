import ReactOnRails from 'react-on-rails';

import PostSection from '../post/PostSection';
import PostForm from '../post/PostForm';
import PostBox from '../post/PostBox';

import CommentSection from '../comment/CommentSection';

import LoginForm from '../sessions/LoginForm';

// var moment = require('moment');
// moment.locale('pt-BR');

ReactOnRails.register({
  PostSection,
  PostForm,
  PostBox,
  CommentSection,
  LoginForm
});
