//사이드바띄우기
import MapContext from './Map/MapContext'
import Header from "./components/template/Header";
import SideNavigation from "./components/template/SideNavigation";
import SideNavigation_right from "./components/template/SideNavigation_right";


// *** Redux 사용하기 ***
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './modules';


import { Col, Row } from "reactstrap";
import { useContext, useEffect, useState } from 'react' // Map 
// Modal창 import
import { PromiseProvider } from 'mongoose';
import './test.css';

import { db_to_csv } from './'

function App() {

  // *** Redux Store만들기 ***
  // const store = createStore(rootReducer); // 스토어를 만듭니다.
  // console.log("스토어상태를 확인해봅시다.");
  // console.log(store.getState()); // 스토어의 상태를 확인해봅시다.
  // const test_state = store.getState();
  // const dispatch = useDispatch();

  // 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
  const listener = () => {
    // const state = store.getState();
    // console.log(state);
  };
    // ************************

  //자식에서 부모 받아오기
  const highFunction = (text) => {
    console.log(text);
  }

  // state = {users: []}
  const { map } = useContext(MapContext) // Map



  const my_name = useState("Barkhaneum");

  //RequestsOptions
  const requestOclsptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};

  //mongoDB Server 
  // useEffect(()=> {
  //   fetch('http://localhost:3002/api/board', requestOptions) 
  //       .then(res => res.json()) // 그런다음 응답으로 jsond형식으로 응답을 한다.
  //       .then(my_name => my_name.setState({my_name})); 
  //       //data 를 받아와서 username
  // });

  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  //**** 부모에서 자식 값 받아오기 Test ****/

   // CSV다운로드할때 바지락, 동죽... 체크박스 상태 전하기위함
   const [textValue, setTextValue] = useState("클릭하세요");
  const getTextValue = (text) =>{
    setTextValue(test);
  }

  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };
  return (
    //*** Redux 저장소 ***/
    // <Provider store={store}>
    <>
      <Row>
        <Col>
          <Header></Header>
        </Col>
      </Row>
      <div style={styles.contentDiv}>
        <SideNavigation propFunction={highFunction}></SideNavigation>

        
        {/* 위의 const형 map을 id로 받아서 사용하는중 */}
        {/* <div id="map" key={()=>my_name("ddd")} style={{ position: 'relative', width: '100%', height: '100vh' }}></div> */}
        {/* Backup Code */}
        <div id="map" key={()=>my_name("ddd")} style={{ position: 'relative', width: '100%', height: '100vh' }}>
        </div>
        
        {/* <div style={styles.contentMargin}>
          <h1 style={{ padding: "20%" }}>This is Content Area</h1>
        </div> */}

        {/* props_test에 다운로드하고자하는 sheet 이름을 넣으면 다운로드할수있음 */}
       {/* <div><SideNavigation_right bar_sw={false} props_test="Razor_clam" getTextValue={getTextValue}></SideNavigation_right></div> */}
       <div><SideNavigation_right bar_sw={false}></SideNavigation_right></div>
      </div>
     
    </>
    // </Provider>
  );
}


export default App;