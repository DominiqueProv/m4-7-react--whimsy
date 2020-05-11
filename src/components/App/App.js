import React, { useContext } from 'react';
import styled from 'styled-components';
import 'focus-visible';
import { format } from 'date-fns'
import avatar from '../../assets/carmen-sandiego.png';
import Tweet from '../Tweet'
import { TweetContext } from '../contexts/tweet.context';

const App = () => {

  return (
    <Wrapper>
        <Tweet
          tweetContents="Where in the world am I?"
          displayName="Carmen Sandiego ✨"
          username="carmen-sandiego"
          avatarSrc={avatar}
          timestamp={format(new Date(), 'p • PP')}
        />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #eee;
`;
export default App;
