import React from "react";
import { Link } from 'react-router-dom';

import '../../resource/css/SubscribeList.css';

const SubscribeList = () => {
  return (
    <article>
      <header>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">뉴스</div>
        <Link to='/subscribe/news'><button>더보기</button></Link>
        <div className="desc">관심 분야의 기사를 빠르게 모아 보실 수 있습니다</div>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">이슈 키워드</div>
        <Link to='/subscribe/keyword'><button>더보기</button></Link>
        <div className="desc">이슈 키워드의 기사만 모아 보실 수 있습니다</div>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">기자</div>
        <Link to='/subscribe/reporter'><button>더보기</button></Link>
        <div className="desc">관심 분야의 전문 기자들의 기사를 모아 보실 수 있습니다</div>
      </div>
      </header>
      <header>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">플레이</div>
        <button>더보기</button>
        <div className="desc">조선일보의 눈을 통해 대한민국의 현재를 보실 수 있습니다</div>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">시리즈</div>
        <button>더보기</button>
        <div className="desc">다양한 분야의 유용한 정보들을 시리즈로 제공합니다.</div>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">커뮤니티</div>
        <button>더보기</button>
        <div className="desc">조선 논객들의 건강한 토론을 다양한 주제로 모아 보실 수 있습니다.</div>
      </div>
      </header>
    </article>
  );
};

export default SubscribeList;
