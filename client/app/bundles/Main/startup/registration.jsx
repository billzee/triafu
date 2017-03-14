import ReactOnRails from 'react-on-rails';
import tetger from 'tether';
import HelloWorld from '../components/HelloWorld';
import Comment from '../components/Comment';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Comment
});
