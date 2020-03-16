import React from "react";
import { Player } from 'video-react';
import more from '../../resource/assets/more.svg';
import like from '../../resource/assets/like.svg';
import comment from '../../resource/assets/comment.svg';
import * as config from '../../config';

const streaming = () => {
  return (
    <article>
    <header>
      <div className="user-info">
        <table>
          <tbody>
            <tr>
              <td><img className = 'profileImg' src={`${config.API_URL}/profile/people.jpg`} alt='profileImg'></img></td>
              <td><span>youtube.com</span></td>
            </tr>
          </tbody>
        </table>
      </div> 
      <img className='rightSort' src={more} alt="Mais" align="right"/>
    </header>

    <Player
      playsInline
      poster={`${config.API_URL}/files/pokeball_btn.jpg`}
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
        <a href='www.naver.com'><strong>비디오</strong></a>
      </p>
      <p className="txt_post">
        testestestetsretestetessrasdasdasdasdasdasdasdasdasd
      </p>

      <p>
        <span>#video</span>
      </p>
    </footer>
  </article>
  );
};

export default streaming;
