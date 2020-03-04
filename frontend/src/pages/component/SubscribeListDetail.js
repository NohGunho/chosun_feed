import React from "react";
import { Link } from 'react-router-dom';

import './SubscribeList.css';

const subscribeClick = () => {
  // api 작성 후 api 호출 로직 구현
  alert('gdgd');
}


// 섹션별 코드 값 정의하여 db에 데이터 넣어주고 그 데이터 가져와서 뿌려주는 형태로 수정해야함. 코드값 정보는 따로 있는지 확인중 
const SubscribeListDetail = () => {
  return (
    <article>
      <header>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">만물상</div>
        <button onClick={subscribeClick} value='만물상'>구독</button>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">교육,취업</div>
        <button>구독</button>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">중동,아프리카</div>
        <button>구독</button>
      </div>
      </header>
      <header>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">야구</div>
        <button>구독</button>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">연애포토</div>
        <button>구독</button>
      </div>
      <div className="items">
        <div className="thumb">
          <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
        </div>
        <div className="tit">트래블&#38;레저</div>
        <button>구독</button>
      </div>
      </header>
    </article>
  );
};

export default SubscribeListDetail;
