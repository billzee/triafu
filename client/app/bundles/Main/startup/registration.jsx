import ReactOnRails from 'react-on-rails';
import CommentBox from '../components/Comment';

// const fetchDefaults = require("fetch-defaults")
//
// const api = fetchDefaults(fetch, '/', {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   credentials: 'same-origin'
// })

// myHeaders = new Headers({
//   "Accept": "application/json",
//   "Content-Type": "application/json"
// });

ReactOnRails.register({
  CommentBox
});
