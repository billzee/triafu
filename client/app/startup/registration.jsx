import ReactOnRails from 'react-on-rails';
import moment from 'moment'
import 'whatwg-fetch'

import PostShareLinks from '../post/PostShareLinks';
import PostSection from '../post/PostSection';
import PostSort from '../post/PostSort';
import PostForm from '../post/PostForm';
import PostBox from '../post/PostBox';
import PublishButton from '../post/PublishButton';

import CommentSection from '../comment/CommentSection';

import LoginForm from '../devise/LoginForm';
import SocialLogin from '../devise/SocialLogin';
import SocialConnect from '../devise/SocialConnect';
import UserImage from '../devise/UserImage';

moment.locale('pt-BR');

ReactOnRails.register({
  PostSort,
  PostSection,
  PostForm,
  PublishButton,
  PostShareLinks,
  PostBox,
  CommentSection,
  LoginForm,
  SocialLogin,
  SocialConnect,
  UserImage
});
