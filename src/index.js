// //기존 소스
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

//맵띄우기 인덱스!!
import "bootstrap/dist/css/bootstrap.css";  // bootstrap.css로서 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Map from './Map'; //context.Provider를 가져옴


ReactDOM.render(
  <React.StrictMode>
    {/* //provider에 저장된 객체를 사용하기 위해  APP을 감쌌다. */}
    <Map>
    <App />
    </Map>
    
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();


// 사이드바 구현 인덱스
// import "bootstrap/dist/css/bootstrap.css";
// import React from "react";
// import App from "./App";
// import "./index.css";
// import ReactDOM from 'react-dom';
// import Map from './Map'; //context.Provider를 가져옴

// ReactDOM.render(
//   <React.StrictMode> 
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// strictMode란 앱내의 잠재적은 문제를 알아내기 위한 도구
// Fragment와 같이 UI를렌더링 하지않곻, 자손들에 대한 부가적인 검사와 경고를 활성화함


//MongoDBTest
