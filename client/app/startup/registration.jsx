import ReactOnRails from 'react-on-rails';
import moment from 'moment'

import Categories from '../header/Categories';
import PostSection from '../post/PostSection';
import PostForm from '../post/PostForm';
import PostBox from '../post/PostBox';

import CommentSection from '../comment/CommentSection';

import LoginForm from '../sessions/LoginForm';

moment.locale('pt-BR');

ReactOnRails.register({
  Categories,
  PostSection,
  PostForm,
  PostBox,
  CommentSection,
  LoginForm
});
