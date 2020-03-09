import React, { Component } from "react";
import api from "../../services/api";

import "./SubscribeList.css";

// 섹션별 코드 값 정의하여 db에 데이터 넣어주고 그 데이터 가져와서 뿌려주는 형태로 수정해야함. 코드값 정보는 따로 있는지 확인중
class SectionSubListDetail extends Component {
  state = {
    subscribeList: []
  };

  async componentDidMount() {
    //console.log(config.API_URL);
    //const response = await api.get(`posts/${id}`);

    const response = await api.get("subscribe");

    this.setState({ subscribeList: response.data.division(3) });

    /*var k = 0;
    for(var i= 0 ;i<this.state.subscribeList.length; i++){
      for(var j= 0 ;j<3; j++){
        k++;
        if(k===21){
          break;
        }
      console.log(i+","+j+ " = " +this.state.subscribeList[i][j].site + "/" +this.state.subscribeList[i][j].first_depth_name);
    }
  }*/
  }

  render() {
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

    console.log(this.state.subscribeList.length);
    return (
      <article>
        {this.state.subscribeList.map(list => (
          <header>
            <div className="items">
              <div className="thumb">
                <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
              </div>
              <div className="tit">{list[0].first_depth_name}</div>
              <button>구독</button>
            </div>
            <div className="items">
              <div className="thumb">
                <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
              </div>
              <div className="tit">{list[0].first_depth_name}</div>
              <button>구독</button>
            </div>
            <div className="items">
              <div className="thumb">
                <img src="http://image.chosun.com/temp/tempx_05.jpg"></img>
              </div>
              <div className="tit">{list[0].first_depth_name}</div>
              <button>구독</button>
            </div>
          </header>
        ))}
      </article>
    );
  }
}

export default SectionSubListDetail;
