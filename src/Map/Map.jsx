import React, { useState, useEffect } from 'react'
import MapContext from './MapContext'
import 'ol/ol.css'

import { Map as OlMap, View } from 'ol'
import { dom } from 'ol/dom'
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {Icon, Style} from 'ol/style';
import MultiPoint from 'ol/geom/MultiPoint';
import { defaults as defaultControls, FullScreen } from 'ol/control'

import { fromLonLat, get as getProjection } from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import {  Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector';

import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import TileJSON from 'ol/source/TileJSON';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import markerIcon from './marker.png';

import LayerSwitcher from 'ol-layerswitcher';

import OSM from 'ol/source/OSM';

import Overlay from 'ol/Overlay';

// 위도,경도 얻어오는
import {toLonLat} from 'ol/proj';
import {getBottomLeft, getTopRight} from 'ol/extent';

import Select from 'ol/interaction/Select';
import {Draw, Modify, Snap} from 'ol/interaction';


//마우스 휠줌
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';

// click Event
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';


import { XYZ } from 'ol/source'
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction'

import jQuery from 'jquery'

// var markerSource = new VectorSource();

// var markerStyle = new Style({
//   image: new Icon({ //마커 이미지
//       opacity: 1, //투명도 1=100% 
//       scale: 0.1, //크기 1=100%

//       //marker 이미지, 해당 point를 marker로 변경한다.
//       src: './marker.png'
//   }),
//     //html의 css, z-index 기능이다.
//   zindex: 10
// });

// var markerLayer = new VectorSource({
//   source: markerSource, //마커 feacture들
//   style: markerStyle //마커 스타일
// });

// const iconFeature = new Feature({
//   geometry: new Point([126.9779228388393, 36.56643948208262]),
//   name: 'Null Island',
//   population: 4000,
//   rainfall: 500,
// });


// const iconStyle = new Style({
//   image: new Icon({
//     anchor: [444.5, 46],
//     anchorXUnits: 'fraction',
//     anchorYUnits: 'pixels',
//     src: 'D:/회사파일/2022_01_13_어패류_웹어플리케이션만들기/openlayers/src/marker.png',
//   }),
// });

const iconStyle = new Style({
  image: new Icon({
    scale: 0.4,
    anchor: [444.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'D:/회사파일/2022_01_13_어패류_웹어플리케이션만들기/openlayers/src/marker.png',
  }),
});


const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group'
});


// iconFeature.setStyle(iconStyle);


//==================================================
// Vector Layer관련된 부분
//==================================================
// const vectorLayer = new VectorLayer({
//   source: vectorSource,
// });

//GIS Vector Layer 예제
// 단일 포인트 찍기


var marker_point_arr = [[126.79388383 ,34.46627316]]



function getTitle(){
  const init_data = {
    mydata : 'test_mydata'
  };

  const requestOptions_init = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    // body: JSON.stringify({title: 'React POST Request Example'})
    // postmen에서 body를 선택해서 보낼때랑 같은 원리임
    body: JSON.stringify(init_data) // Db에 데이터 전송할때 여기에다가 넣어서 보낸다.
  };
  const response_init = fetch('http://localhost:3002/api/board_2', requestOptions_init);
  return response_init.then(data =>  data.json()
      // const lat_tt = data.lat_arr; // 서버로부터 lat배열을 받아옴
      // const lon_tt = data.lon_arr; // 서버로부터 lat배열을 받아옴
      // console.log(lat_tt);
      // for (var i = 0; i < 5; i++) {
      //     var t_lat_arr = parseFloat(lat_tt[i]);
      //     // console.log(t_lat_arr);
      //     var t_lon_arr = parseFloat(lon_tt[i]);
      //     marker_point_arr.push([t_lon_arr,t_lat_arr]);
      //     // console.log(callback); 
      // }
  );
}

async function exec(ttt){ // getTitle함수로부터 값을 얻을때까지 기다려줌
  var test = await getTitle(); // api로부터 데이터 가져옴 
  console.log(test + "와 왜안되냐...");
}

exec(marker_point_arr); //값을 얻을때까지 대기...

console.log(marker_point_arr +"   " + "웹페이지 로드"); 

// console.log(marker_point_arr[1])
var multiple_point = new MultiPoint(marker_point_arr);
var pointFeature = new Feature(multiple_point);

// var pointFeature = "";
// var lineFeature = new Feature(new LineString([[-1e7, 1e6], [-1e6, 3e6]]));
// var lineFeature = new Feature(new LineString([[126.9779228388393, 36.56643948208262], [126.2779228388393, 36.66643948208262]]));
// var polygonFeature = new Feature(
//     new Polygon([[[-3e6, -1e6], [-3e6, 1e6], [-1e6, 1e6], [-1e6, -1e6], [-3e6, -1e6]]]));


var vectorsource = new VectorSource({
  features: [pointFeature]
});

const vectorlayer = new VectorLayer({
  source: vectorsource,
  style: new Style({
      image: new Icon(({
          anchor: [0.0, 0.0],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          opacity: 0.95,
          scale : 0.005,
          offset: [0,0],
          rotation: 0,
          src: markerIcon,
          offsetOrigin: 'bottom-left'
      })),
      // stroke: new Stroke({
      //     width: 3,
      //     color: [255, 0, 0, 1]
      // }),
      // fill: new Fill({
      //     color: [0, 0, 255, 0.6]
      // })
  })
});
//==================================================
// 지도 레이어 관련된 부분
//==================================================
// 예제 레스터레이어
// const rasterLayer = new TileLayer({
//   source: new TileJSON({
//     url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
//     crossOrigin: '',
//   }),
// });
// const centerPoint = [0,0];

//Vworld 레스터레이어
const rasterLayer = new TileLayer({
  source: new XYZ({ //인증키는 vworld에서 발급 가능
    url: 'http://api.vworld.kr/req/wmts/1.0.0/96868902-5420-3080-9EA0-A7BEE9C219C4/Base/{z}/{y}/{x}.png',
  }),
})

const centerPoint = [127.8945727, 35.7505553];

// 테스트중.....
let draw, snap; // global so we can remove them later

const selected = new Style({
  fill: new Fill({
    color: '#03c6fc',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2,
  }),
});

// 요소 선택
const selectElement = document.getElementById('type');
let select = null; // ref to currently selected interaction

function selectStyle(feature) { // 마우스 클릭시 호출되는 함수
  const color = feature.get('COLOR') || '#eeeeee';
  // selected.getFill().setColor(color);
  console.log(color)
  return selected;
}


const selectClick = new Select({
  condition: click,
  // style: selectStyle,
});


// const selectSingleClick = new Select({style: selectStyle});

select = selectClick; //Map Interaction으로 연동


// check_test.setAttribute("checked", true);
// link.setAttribute('input', 'true');

// //*************** 팝업 테스트 
// const element = document.getElementById('popup');
// const popup = new Overlay({
//   element: element,
//   positioning: 'bottom-center',
//   stopEvent: false,
// });


const Map = ({ children }) => {
  
  const [mapObj, setMapObj] = useState({})

  useEffect(() => {

  //Map 객체 생성 및 vworld 지도 설정
    const map = new OlMap({  // Map 객체 생성
      controls: defaultControls({ zoom: false, rotate: false }).extend([
        new FullScreen(),
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [rasterLayer, vectorlayer],  //여기에 VectorLyaer추가(마커추가)
      target: 'map',
      view: new View({
        projection: getProjection('EPSG:4326'), // 위도,경도 값에 따라 Projection을 다르게해야할수도 있음
        center: fromLonLat( 
          centerPoint, //[경도, 위도] 값 설정! 필자는 시청으로 설정
          getProjection('EPSG:4326')
        ),
        zoom: 7,
      }),
      
    })
//*************** 맵에 특성 넣는곳 *************** 
// document.getElementById('email_2').setAttribute('href',"https://kkamikoon.tistory.com");

// const link = document.createElement('test_1');
// link.setAttribute('href', 'css/ol.css');
// map.addInteraction(select);

// map.on('singleclick', function (evt) {
//   map.forEachLayerAtPixel(evt.pixel, function(layer) {
//       console.log(evt.pixel);
//       console.log(layer);
//       // var id = layer.get('title');
//       // console.log(id);
//       // var title = layer.get('title');
//       // console.log(title);
//       // var whatever = layer.get('whatever');
//       // console.log(whatever);
//   });
// });


// 맵 초기화시켜주는 코드
// map.getLayers().forEach(layer => layer.getSource().refresh());
// map.addControl(new LayerSwitcher());

vectorlayer.setVisible(false)

// 여기에서 monogodb에 접속해야함
// //*************** 체크박스 클릭시 마커 표시 하기! ***************
// *************** to-do ***************
// 1. 클릭시?? MongoDB에서 데이터 불러와야함
// 2.  

// MongoDB에 응답 옵션 설정

const user = {
    username: 'bark',
    contents: 'hansome boy'
};
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    // body: JSON.stringify({title: 'React POST Request Example'})
    body: JSON.stringify(user) // Db에 데이터 전송할때 여기에다가 넣어서 보낸다.
};


//아래 requests옵션에 넣어줄데이터 
const my_data = {
  mydata : 'test_mydata'
};

const requestOptions_2 = {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  // body: JSON.stringify({title: 'React POST Request Example'})
  // postmen에서 body를 선택해서 보낼때랑 같은 원리임
  body: JSON.stringify(my_data) // Db에 데이터 전송할때 여기에다가 넣어서 보낸다.
};

document
    .getElementById('test_1')
    .onclick = function () { // ElementID값은 SideNavigation.js에서 설정
        if (document.getElementById('test_1').checked === true) {
            // 여기서 MongoDB에 접속해야함 const response = fetch('http://localhost:3002/api/board',
            // requestOptions).then(     res => res.json())  그런다음 응답으로 json형식으로 응답을 한다.
            // .then(my_name => my_name.setState({my_name})); writer라는것을 보내준다.
            const response_2 = fetch('http://localhost:3002/api/board_2', requestOptions_2).then(
                res => res.json()
            ) // 그런다음 응답으로 json형식으로 응답을 한다.

            // .then(my_name => my_name.setState({my_name})); data 를 받아와서 username
            // console.log(response_2.data); response_2.then(data =>
            // console.log(data.lat_arr));   배열로 반환 response_2.then(data =>
            // console.log(data.lon_arr));   배열로 반환
            response_2.then(data => {
                const lat_tt = data.lat_arr; // 서버로부터 lat배열을 받아옴
                const lon_tt = data.lon_arr; // 서버로부터 lat배열을 받아옴
                // console.log(lon_tt);
                // for (var i = 0; i < 6; i++) {
                // }
            })

            vectorlayer.setVisible(true) // Marker Visible
            // console.log("on")
        } else {
            vectorlayer.setVisible(false)
            // console.log("off")
        }
    };

// toggle(selectElement);


// const selectElement = document.getElementById('test_1').checked = true;
// console.log(selectElement);
// vectorlayer.setVisible(false) // 벡터레이어 보이게안보이게
//************************************************  
    setMapObj({ map })
    return () => map.setTarget(undefined)
  }, [])
  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>
}

export default Map