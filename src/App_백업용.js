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
import { useContext, useState } from 'react' // Map 
function App() {

    
  const { map } = useContext(MapContext) // Map


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
        <div id="map" style={{ position: 'relative', width: '100%', height: '100vh' }}></div>
        {/* <div style={styles.contentMargin}>
          <h1 style={{ padding: "20%" }}>This is Content Area</h1>
        </div> */}
      </div>
    </>
  );
}


export default App;