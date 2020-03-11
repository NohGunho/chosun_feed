import React, { Component } from "react";
import api from "../../services/api";

import "./SubscribeList.css";

// 섹션별 코드 값 정의하여 db에 데이터 넣어주고 그 데이터 가져와서 뿌려주는 형태로 수정해야함. 코드값 정보는 따로 있는지 확인중
class SectionSubList extends Component {
  state = {
    subscribeList: []
  };

  // component 렌더링 시 데이터 세팅
  async componentDidMount() {
    const response = await api.get("sectionSubscribe");

    this.setState({ subscribeList: this.division(response.data,3) });
  }
  
  //구독버튼 눌렀을 시 액션
  subScribe = e =>  {
    api.post(`followSection/test,${e.target.value}`);
  };

  // 배열 자르기 (map으로 데이터 뿌려주기 위해 n개씩 자름)
  division = (arr,n) => {
    var len = arr.length;
    var cnt = Math.floor(len / n);
    var tmp = [];
    for (var i = 0; i <= cnt; i++) {
      tmp.push(arr.splice(0, n));
    }
    return tmp;
  };

  render() {
    
    return (
      <article>
        {this.state.subscribeList.map(list => (
          <header>
            <div className="items">
              <div className="thumb">
                <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
              </div>
              <div className="tit">{list[0].site}/{list[0].first_depth_name}</div>
              <button value={list[0].first_depth_code} onClick={this.subScribe}>구독</button>
            </div>
            {list[1] != null ? (
              <div className="items">
                <div className="thumb">
                  <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
                </div>
            <div className="tit">{list[1].site}/{list[1].first_depth_name}</div>
                <button value={list[1].first_depth_code} onClick={this.subScribe}>구독</button>
              </div>
            ) : (
              <></>
            )}
            {list[2] != null ? (
              <div className="items">
                <div className="thumb">
                  <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
                </div>
                <div className="tit">{list[2].site}/{list[2].first_depth_name}</div>
                <button value={list[2].first_depth_code} onClick={this.subScribe}>구독</button>
              </div>
            ) : (
              <></>
            )}
          </header>
        ))}
        <header></header>
      </article>
    );
  }
}

export default SectionSubList;
