import ReactOnRails from 'react-on-rails';
import moment from 'moment'
import 'whatwg-fetch'

import PostSort from '../post/PostSort';
import PostSection from '../post/PostSection';
import PostForm from '../post/PostForm';
import PostBox from '../post/PostBox';

import CommentSection from '../comment/CommentSection';

import LoginForm from '../devise/LoginForm';
import CurrentUser from '../devise/CurrentUser';
import SocialLogin from '../devise/SocialLogin';
import SocialConnect from '../devise/SocialConnect';
import UserImage from '../devise/UserImage';

moment.locale('pt-BR');

ReactOnRails.register({
  PostSort,
  PostSection,
  PostForm,
  PostBox,
  CommentSection,
  LoginForm,
  SocialLogin,
  SocialConnect,
  UserImage,
  CurrentUser
});
