import React, { Component } from "react";
import api from "../../services/api";
import SectionSubListDetail from "./SectionSubListDetail";

import "./SubscribeList.css";

// 섹션별 코드 값 정의하여 db에 데이터 넣어주고 그 데이터 가져와서 뿌려주는 형태로 수정해야함. 코드값 정보는 따로 있는지 확인중
class SectionSubList extends Component {
  state = {
    subscribeList: []
  };

  async componentDidMount() {
    //console.log(config.API_URL);
    //const response = await api.get(`posts/${id}`);

    const response = await api.get("subscribe");

    this.setState({ subscribeList: response.data.division(3) });
  }

  render() {

    function subScribe1() {
    };

    Array.prototype.division = function(n) {
      var arr = this;
      var len = arr.length;
      var cnt = Math.floor(len / n);
      var tmp = [];

      for (var i = 0; i <= cnt; i++) {
        tmp.push(arr.splice(0, n));
      }
      return tmp;
    };

    return (
      <article>
        {this.state.subscribeList.map(list => (
          <header>
            <div className="items">
              <div className="thumb">
                <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
              </div>
              <div className="tit">{list[0].site}/{list[0].first_depth_name}</div>
              <button onClick={subScribe1()}>구독</button>
            </div>
            {list[1] != null ? (
              <div className="items">
                <div className="thumb">
                  <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
                </div>
            <div className="tit">{list[1].site}/{list[1].first_depth_name}</div>
                <button>구독</button>
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
                <button>구독</button>
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
