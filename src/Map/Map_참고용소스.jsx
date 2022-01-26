import React, { useState, useEffect } from 'react'
import MapContext from './MapContext'
import 'ol/ol.css'

import { Map as OlMap, View } from 'ol'
import { dom } from 'ol/dom'
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {Icon, Style} from 'ol/style';
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
var pointFeature = new Feature(new Point([126.79388383 ,34.46627316 ]));

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



const selectElement = document.getElementById('test_1').checked;

document.getElementById('test_1').onclick = function () {
  if(document.getElementById('test_1').checked === true){
    vectorlayer.setVisible(true)
    console.log("on")
  } else {
    vectorlayer.setVisible(false)
    console.log("off")
  }
};

const handleChecked = (event) => {
  console.log(selectElement) //체크 박스 상태확인
};

function toggle(checked) {
  if (checked === true) {
    console.log("토글 온");
    vectorlayer.setVisible(true) // 벡터레이어 보이게안보이게
  } else {
    console.log("토글 오프");
    vectorlayer.setVisible(false) // 벡터레이어 보이게안보이게
  }
}

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