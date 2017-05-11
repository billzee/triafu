import ReactOnRails from 'react-on-rails';
import moment from 'moment'

import Categories from '../header/Categories';
import PostSection from '../post/PostSection';
import PostForm from '../post/PostForm';
import PostBox from '../post/PostBox';

import CommentSection from '../comment/CommentSection';

import LoginForm from '../devise/LoginForm';
import CurrentUser from '../devise/CurrentUser';
import SocialLogin from '../devise/SocialLogin';
import UserImage from '../devise/UserImage';

moment.locale('pt-BR');

ReactOnRails.register({
  Categories,
  PostSection,
  PostForm,
  PostBox,
  CommentSection,
  LoginForm,
  SocialLogin,
  UserImage,
  CurrentUser
});
