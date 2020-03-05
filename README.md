# Chosun-feed Project

node.js(express) 로 이루어진 back-end 와 react를 사용한 front-end 로 구축된 조선일보 feed Project

## 개발 환경

node : v9.6.0
npm : 5.6.0        
mongoDB : v4.2.3  // getStream.io 의 저장되는 데이터와의 동기화를 위해 사용
getstream.io      // 기사 데이터, follow 데이터 관리 API  

## 설치 및 실행 방법

First, go to the "backend" folder and run:

```bash
npm install
```

After node_modules installation has completed, run:

```bash
npm run dev
```

Second, go to the "frontend" folder and run:

```bash
npm install
```
After node_modules installation has completed, run:

```bash
npm start
```


## Quick Start 

```bash
vi backend/config/config.js     setting 

  APP_ID: "70719",    // getStream.io app id
  APP_KEY: "p5mv3rqjj4u6",    // getStream.io app key
  APP_SECRET: "qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te",     // getStream.io app secret
  DB_URL:'mongodb://localhost:27017/feed_test'     // db URL
```



```bash
vi frontend/src/config.js    API_URL setting 

export const API_URL = 'http://192.168.0.12:3333';
```


```bash
db/sample_data/sample.json
setting 한 mongoDB 안 posts Collection 생성 후 data import 
```

```bash
start_url : http://x.x.x.x:3000/feed/노건호    , http://x.x.x.x:3000/feed/노건호1
```

