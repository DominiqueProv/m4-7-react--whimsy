import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { TweetProvider } from './components/contexts/tweet.context';
ReactDOM.render(  <TweetProvider><App /></TweetProvider>, document.getElementById('root'));
