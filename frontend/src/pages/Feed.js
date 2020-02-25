import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

// Player 사용위해 추가 
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";


import '../pages/Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';


class Feed extends Component {
  state = {
    feed: [],
  }

  async componentDidMount() {

    this.registerToSocket();
    const response = await api.get('posts');

    this.setState({ feed: response.data }); 
  }

  registerToSocket = () => {
    const socket = io('http://192.168.1.121:3333');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    })

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id ===likedPost._id ? likedPost : post
        )
      });
    })
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        { this.state.feed.map(post => (
          <article key={ post._id }>
            <header>
              <div className="user-info">
                <table>
                  <tbody>
                    <tr>
                      <td><img className = 'profileImg' src='http://192.168.1.121:3333/profile/people.jpg' alt='profileImg'></img></td>
                      <td><span>{ post.site }</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <img className='rightSort' src={more} alt="Mais" align="right"/>
            </header>

            <img src={`http://192.168.1.121:3333/files/${ post.image }`} alt=""/>
  
            <footer>
              <div className="actions">
                <button type="button" onClick={ () => this.handleLike(post._id)}>
                  <img src={ like } alt=""/>
                </button>
                <img src={ comment } alt=""/>
              </div>
              <strong>{ post.likes } curtidas</strong>
              <p>
                <a href='#'><strong>{ post.title }</strong></a>
              </p>
              <p className="txt_post">
                {post.contents}
              </p>

              <p>
                <span>{ post.hashtags }</span>
              </p>
            </footer>
          </article>
        )) }


        <article>
          <header>
            <div className="user-info">
              <table>
                <tbody>
                  <tr>
                    <td><img className = 'profileImg' src='http://192.168.1.121:3333/profile/people.jpg' alt='profileImg'></img></td>
                    <td><span>youtube.com</span></td>
                  </tr>
                </tbody>
              </table>
            </div> 
            <img className='rightSort' src={more} alt="Mais" align="right"/>
          </header>

          <Player
            playsInline
            poster="/assets/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />

          <footer>
            <div className="actions">
              <button type="button" onClick={ () => this.handleLike(1)}>
                <img src={ like } alt=""/>
              </button>
              <img src={ comment } alt=""/>
            </div>
            <strong>0 curtidas</strong>
            <p>
              <a href='#'><strong>비디오</strong></a>
            </p>
            <p className="txt_post">
              testestestetsretestetessrasdasdasdasdasdasdasdasdasd
            </p>

            <p>
              <span>#video</span>
            </p>
          </footer>
        </article>
      </section>
    );
  }
}

export default Feed;