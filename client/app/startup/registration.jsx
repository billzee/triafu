import ReactOnRails from 'react-on-rails';

import PostBox from '../components/Post';
import CommentBox from '../components/Comment';

var moment = require('moment');
moment.locale('pt-BR');

ReactOnRails.register({
  PostBox,
  CommentBox
});
