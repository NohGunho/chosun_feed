import React from 'react';

// Player 사용위해 추가 
import "../../node_modules/video-react/dist/video-react.css";

import SubscribeList from './component/SubscribeList';
import Streaming from './component/Streaming';
import Feed from './component/Feed';

const Main = ({match}) => {

  const isLoggedIn = match.params.id;
  
    let follow = null;
    if (isLoggedIn != null) {
      follow = <SubscribeList />;
    } else {
    }
  return (
    <section id="post-list">
        {follow}
        <Feed id ={match.params.id}> </Feed>
        <Streaming />
      </section>
  )
}

export default Main;