import React, { Component } from 'react';
import api from '../../services/api';
import io from 'socket.io-client';
import * as config from '../../config';

// Player 사용위해 추가 
import "../../../node_modules/video-react/dist/video-react.css";

import './Feed.css';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';

class Feed extends Component {
  state = {
    feed: [],
    token: '',
  }
  // rendering 후 실행
  async componentDidMount() {
    //console.log(config.API_URL);
    this.registerToSocket();

    //const response = await api.get(`posts/${id}`);

    const response = await api.get('posts',{ params: { id: `${this.props.id}`}});
    
    this.setState({ feed: response.data }); 
  }

  // rendering 전 실행
  /*async componentWillMount() {
    const feedName = 'timeline'
    const id = 'test';
    //this.setState({ token: api.get(`/getToken/${id},${feedName}`) });
    const token = await api.get(`/getToken/${id},${feedName}`);
    this.setState({token : token.data});
    }*/
  registerToSocket = () => {
    const socket = io(config.API_URL);

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


  followClick = () => {
    alert('gdgd');
  }

  render() {
    return (
      <>
        { this.state.feed.map(post => (        
          <article key={ post._id }>
            <header>
              <div className="user-info">
                <table>
                  <tbody>
                    <tr>
                      <td><img className = 'profileImg' src={`${config.API_URL}/profile/people.jpg`} alt='profileImg'></img></td>
                      <td><span>{ post.site }</span> <button value={post.name} onClick = {this.followClick} >follow</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <img src={more} alt="Mais" align="right"/>
            </header>

            <img src={`${config.API_URL}/files/${ post.image }`} alt=""/>
  
            <footer>
              <div className="actions">
                <button type="button" onClick={ () => this.handleLike(post._id)}>
                  <img src={ like } alt=""/>
                </button>
                <img src={ comment } alt=""/>
              </div>
              <strong>{ post.likes } likes</strong>
              <p>
                <a href='https://www.naver.com'><strong>{ post.title }</strong></a>
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
      </>
    );
  }
}

export default Feed;