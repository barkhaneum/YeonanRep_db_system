// //기존소스
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

//지도띄우기 APP
// import logo from './logo.svg'
// import './App.css'
// import { useContext, useState } from 'react'
// import MapContext from './Map/MapContext'

// function App() {
//   const { map } = useContext(MapContext)

//   return (
//     <>
//       <div id="map" style={{ position: 'relative', width: '100%', height: '100vh' }}>
//       </div>
//     </>
//   )
// }

// export default App


//사이드바띄우기
import MapContext from './Map/MapContext'
import Header from "./components/template/Header";
import SideNavigation from "./components/template/SideNavigation";
import { Col, Row } from "reactstrap";
import { useContext, useEffect, useState } from 'react' // Map 
function App() {

    
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
    <>
      <Row>
        <Col>
          <Header></Header>
        </Col>
      </Row>
      <div style={styles.contentDiv}>
        <SideNavigation></SideNavigation>
        
        {/* 위의 const형 map을 id로 받아서 사용하는중 */}
        {/* <div id="map" key={()=>my_name("ddd")} style={{ position: 'relative', width: '100%', height: '100vh' }}></div> */}
        {/* Backup Code */}
        <div id="map" key={()=>my_name("ddd")} style={{ position: 'relative', width: '100%', height: '100vh' }}></div>
        
        
        {/* <div style={styles.contentMargin}>
          <h1 style={{ padding: "20%" }}>This is Content Area</h1>
        </div> */}
      </div>
    </>
  );
}


export default App;