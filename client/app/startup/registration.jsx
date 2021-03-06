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
import UserPresentation from '../devise/UserPresentation';
import SocialConnect from '../devise/SocialConnect';
import UserImage from '../devise/UserImage';

import NotificationBell from '../notification/NotificationBell';
import NotificationList from '../notification/NotificationList';

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
  UserPresentation,
  UserImage,
  NotificationList,
  NotificationBell
});
