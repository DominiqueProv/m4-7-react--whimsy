import React, { createContext, useReducer } from 'react';

export const TweetContext = createContext();


const tweetState = {
  numOfLikes: 60,
  numOfRetweets: 88,
  isLiked: false,
  isRetweeted: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'LIKE':
      const wasLiked = state.isLiked;
      return {
        ...state,
        isLiked: !wasLiked,
        numOfLikes: wasLiked ? state.numOfLikes - 1 : state.numOfLikes + 1
      };
    case 'RETWEET':
      const wasTweeted = state.isRetweeted
      return {
        ...state,
        isRetweeted: !wasTweeted,
        numOfRetweets: wasTweeted ? state.numOfRetweets -1 : state.numOfRetweets + 1
      };
    default:
      return {
        ...state
      };
  }
}


export const TweetProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, tweetState);

  const toggleLike = () => {
    dispatch({
      type: 'LIKE',
    });
  };

  const toggleRetweet = () => {
    dispatch({
      type: 'RETWEET',
    });
  };

  return (
    <TweetContext.Provider
      value={{
        state,
        actions: {
          toggleLike,
          toggleRetweet
        },
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

