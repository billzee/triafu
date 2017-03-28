import ReactOnRails from 'react-on-rails';

import PostSection from '../post/PostSection';
import CommentSection from '../comment/CommentSection';

var moment = require('moment');
moment.locale('pt-BR');

ReactOnRails.register({
  PostSection,
  CommentSection
});
