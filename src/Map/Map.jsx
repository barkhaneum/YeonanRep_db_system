import React, { useState, useEffect } from 'react'
import MapContext from './MapContext'
import 'ol/ol.css'

import { Map as OlMap, View } from 'ol'
// import { dom } from 'ol/dom'
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {Icon, Style} from 'ol/style';
// import MultiPoint from 'ol/geom/MultiPoint';
import { defaults as defaultControls, FullScreen } from 'ol/control'

import { fromLonLat, get as getProjection } from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import {  Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector';

// import Polygon from 'ol/geom/Polygon';
// import LineString from 'ol/geom/LineString';
// import TileJSON from 'ol/source/TileJSON';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Manila_clam_Icon from '../image/Manila_clam_Icon.png';
import surf_clam_Icon from '../image/surf_clam_pictogram.png';
import chinese_cyclina_Icon from '../image/chinese_cyclina_Icon.png';
import clam_Icon from '../image/clam_Icon.png';
import cockle_Icon from '../image/cockle_Icon.png';
import Razor_clam_Icon from '../image/Razor_clam_Icon.png';

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

import { CSVLink, CSVDownload } from "react-csv";

//*** Redux사용 ***
import {useDispatch, useSelector} from "react-redux";
import { input_buis_Text } from "../modules/checkbox_state"; // 액션함수를 가져온다.



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

//*** 초기 zoom 위치 *** 
const centerPoint = [127.4228469, 34.79607417];
// const zoom_size = 12;
const zoom_size = 8;



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
// var marker_point_arr_test = [[126.79388383 ,34.46627316],[125.79388383 ,34.46627316]]


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
  const response_init = fetch('http://192.168.0.8:3002/api/board_2', requestOptions_init);
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
  console.log(test + "이제됨");
}

exec(marker_point_arr); //값을 얻을때까지 대기...

console.log(marker_point_arr +"   " + "웹페이지 로드"); 

// console.log(marker_point_arr[1])
var multiple_point = new Point(marker_point_arr);
var pointFeature = new Feature(multiple_point);



// var pointFeature = "";
// var lineFeature = new Feature(new LineString([[-1e7, 1e6], [-1e6, 3e6]]));
// var lineFeature = new Feature(new LineString([[126.9779228388393, 36.56643948208262], [126.2779228388393, 36.66643948208262]]));
// var polygonFeature = new Feature(
//     new Polygon([[[-3e6, -1e6], [-3e6, 1e6], [-1e6, 1e6], [-1e6, -1e6], [-3e6, -1e6]]]));

//*** 마커 벡터레이어 동적 스위치 ***/
var marker_vector_arr = new Array();

var vectorsource = new VectorSource({
  features: [pointFeature]
});


// Marker를 붙이는 VectorLayer정의
var vectorlayer = new VectorLayer({
  source: vectorsource,
  style: new Style({
      image: new Icon(({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          opacity: 0.95,
          // scale : 0.005,
          scale : 0.35,
          offset: [0,0],
          rotation: 0,
          src: surf_clam_Icon,
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
  //*** Redux 사용  ***/
  const dispatch = useDispatch();
  
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
        zoom: zoom_size,
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

// 이쪽입니다.

// const popup = new Overlay({
//   element: document.getElementById('popup'),
// });

map.on("moveend",function(evt){
  console.log("뷰체인지");
  vectorlayer.setVisible(false)
  vectorlayer.setVisible(true)
  console.log("뷰체인지_e");
});


//***** 마커 클릭 Event *****
var overlay = null;
const selected = [];
map.on('click', function (evt) { // 맵에서 클릭이벤트가 발생했을때..
    map.removeOverlay(overlay); //맵에서 클릭 이벤트가 일어났을때 다른 팝업창을 지운다.
    // map.removeOverlay(cui); 마커를 클릭했을대 모든 마커들의 Feature를 가져오고..
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (f) {
        return f;
    });

    if (feature) { //만약에 눌린게 마커라면...

        console.log(feature.values_.geometry.flatCoordinates); //마커클릭시 위도,경도값을 난타냄
        var doc_data = null;
        var get_marker_longitude = feature.values_.geometry.flatCoordinates;
        
        const req_data = load_data(get_marker_longitude); // 마커의 경도값을 보내고 해당경도의 DB데이터를 불러온다.
        
        return req_data.then((value) => {
            doc_data = value.doc_data; //DB로부터 doc데이터를 받는다.
            var coordinates = feature
                .getGeometry()
                .getCoordinates(); //-->마커들의 위치값을 가져옴
            console.log("마커가 눌렸음")
            let container = document.createElement('div');
            let content = document.createElement('div');
            let content_2 = document.createElement('div');
            let content_3 = document.createElement('div');
            container
                .classList
                .add('ol-popup-custom'); // ./src/test.css 에서 수정


            content
                .classList
                .add('popup-content');

            content_2
                .classList
                .add('popup-content-2');

            content_3
                .classList
                .add('popup-content-3');

            container.appendChild(content);
            container.appendChild(content_2);
            container.appendChild(content_3);
            document
                .body
                .appendChild(container);

            var coordinate = evt.coordinate; // 클릭한 지도 좌표

            // 마커 클릭했을때 에러나는부분 해결 해야함
            try {
              
            } catch (error) {
              
            }

            // 아래에 표시할 내용적용
            // DB로부터 받은 Doc에서 데이터를 하나씩 꺼내서 적용
            content.innerHTML =
            '<span class = "my_span">' +
                  '<div> 지 역-1 : '+ (doc_data.local_1) + '</div>' +
                  '<div> 지 역-2 : '+ (doc_data.local_2) + '</div>' +
                  '<div> 어촌계 : '+ (doc_data.fishing_village) + '</div>' +
                  '<div> 조사일 : '+ (doc_data.investigation_data) + '</div>' +
                  '<div> 사업명 : '+ (doc_data.business_name) + '</div>' +
                  '<div> 계약기관 : '+ (doc_data.servant_agency) + '</div>' +
                  '<div> 어장번호 : '+ (doc_data.fishery_number) + '</div>' +
                  '<div> 위 도 : '+ parse_float_data(doc_data.lat) + '</div>' +
                  '<div> 경 도 : '+ parse_float_data(doc_data.lon) + '</div>' +
                  '<div> MSL : '+ parse_float_data(doc_data.msl) + '</div>' +
                  '<div> 노출시간(1조석/min) : '+ parse_float_data(doc_data.exp) + '</div>' +
                  '<div> 코 어 : '+ (doc_data.core) + '</div>' +
                  '<div> 자 갈(%) : '+ parse_float_data(doc_data.pebble) + '</div>' +
                  '<div> 모 래(%) : '+ parse_float_data(doc_data.sand) + '</div>' +
                  '<div> 실 트(%) : '+ parse_float_data(doc_data.silt) + '</div>' +
                  '<div> 점 토(%) : '+ parse_float_data(doc_data.clay) + '</div>' +
                  '<div> 평 균(Ø) : '+ parse_float_data(doc_data.avg) + '</div>' +
                  '<div> 분 급(Ø) : '+ parse_float_data(doc_data.class) + '</div>' +
                  '<div> 왜 도 : '+ parse_float_data(doc_data.skewness) + '</div>' +
                  '<div> 첨 도 : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  
                  
            '</span> ';

            content_2.innerHTML =
            '<span class = "my_span_2">' +
                  '<div> 용존산소(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 염록소-a(ug/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 암모니아(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 규산규소(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 인 산(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 아질산(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 질 산(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> DIN(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> DIP(mg/L) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 품 종 : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 총 서식밀도(패류:inds/m2) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 치패밀도(inds/m2) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 폐사율(%) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 각 장(mm) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 각 고(mm) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 각 폭(mm) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 전중량(mm) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 각중량(g) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
            '</span>';

            content_3.innerHTML =
            '<span class = "my_span_3">' +
                  '<div> 모 드 : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> WC(%) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> IL(%) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> COD(mg/g) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> AVS(mg/g) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> TOC(%) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 수 온(℃) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 염 분(psu) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> pH : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 형 태 : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> (식물플랑크톤)종 수 : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> (식물플랑크톤)밀 도(cell/ml) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> (저서미세조류)종 수 : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> (저서미세조류)밀 도(ug/cm3) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> (저서미세조류)밀 도(cell/mL) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 육중량(g) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 비만도(CI) : '+ parse_float_data(doc_data.kurtosis) + '</div>' +
                  '<div> 퇴적물 유형 : '+ (doc_data.kurtosis) + '</div>' +
            '</span>';

            overlay = new Overlay({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });

            map.addOverlay(overlay);
            overlay.setPosition(coordinate);
        })
    }
});

// 맵 초기화시켜주는 코드
// map.getLayers().forEach(layer => layer.getSource().refresh());
// map.addControl(new LayerSwitcher());
// vectorlayer.setVisible(false)


// *** Doc데이터값 소수 3번째자리에서 반올림 ***
function parse_float_data(doc_data) {
  return parseFloat(doc_data).toFixed(4);
}


// *** 마커눌렀을때 팝업창에 정보 표시해주는 부분 *** 
function load_data(geo_data) {
    var req_data_set = null;
    //아래 requests옵션에 넣어줄데이터
    const my_data = {
        // mydata: 'test_mydata'
        lat: String(geo_data[1]),
        lon: String(geo_data[0]), // 경도값을 DB에 보낼 데이터셋에 담는다.
    };

    const requestOptions_3 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({title: 'React POST Request Example'}) postmen에서 body를
        body: JSON.stringify(my_data) // Db에 데이터 전송할때 여기에다가 넣어서 보낸다.
    };

    // load_data함수가 마커를 클릭했을때 호출
    const response_3 = fetch('http://192.168.0.8:3002/api/board_3', requestOptions_3).then(
        res => res.json()
    )
    // return response_3.then(data => { // fetch에서 반환해주는 값을 Return해야 동기식으로 처리가됨
    //   req_data_set = data.clay;
    // });
    return response_3
}


// *** 백업용 소스 *** 
// function add_markers(markers){
//   var marker_point_arr_test = markers; //
//   var multiple_point_test = new MultiPoint(marker_point_arr_test);
//   var pointFeature_test = new Feature({geometry:multiple_point_test});
//   var vectorsource_test = new VectorSource({features: [pointFeature_test]});
//   vectorlayer.setSource(vectorsource_test);

//   // console.log(multiple_point_test.getPoint());
//   // multiple_point_test.get
// }

var marker_obj = {};
var vectorsource_test = new VectorSource();
var pointFeature_test = {};
var marker_feature_arr = {};


function set_style_func(icon) {
    return new Style({
        image: new Icon(({
            anchor: [
                0.5, 0.5
            ],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.95,
            // scale : 0.005,
            scale: 0.4,
            offset: [
                0, 0
            ],
            rotation: 0,
            src: icon,
            offsetOrigin: 'bottom-left'
        })),
        // stroke: new Stroke({     width: 3,     color: [255, 0, 0, 1] }), fill: new
        // Fill({     color: [0, 0, 255, 0.6] })
    })
}

function add_markers(markers, db_name){
  
    var marker_point_arr_test = markers;
    var t_marker_arr_feature = [];
    var marker_icon;

    //*** 체크박스에 따라 마커 다르게  ***
    if(db_name === "Manila_clam"){
      marker_icon = Manila_clam_Icon;
    } else if(db_name === "Surf_clam"){
      marker_icon = surf_clam_Icon;
    } else if(db_name === "chinese_cyclina"){
      marker_icon = chinese_cyclina_Icon;
    } else if(db_name === "Clam"){
      marker_icon = clam_Icon;
    } else if(db_name === "cockle"){
      marker_icon = cockle_Icon;
    } else if(db_name === "Razor_clam"){
      marker_icon = Razor_clam_Icon;
    }

    

    for(var i = 0; i< markers.length; i++){
      var t_marker = new Point(marker_point_arr_test[i]);
      var t_feature = new Feature({geometry:t_marker});

      t_feature.setStyle(set_style_func(marker_icon));
      vectorsource_test.addFeature(t_feature); // 벡터 소스에 마커 추가
      t_marker_arr_feature.push(t_feature); // 마커들을 쌓아둔다.
    }
    
    vectorlayer.setSource(vectorsource_test); // 랜더링까지 다시해줌
    // vectorlayer.add
    // console.log(multiple_point_test.getPoint());
    // multiple_point_test.get
    return t_marker_arr_feature; // 쌓은 마커들을 Return
  }

function req_db_data(db_name){
  document
      .getElementById(db_name)
      .onclick = function () { // ElementID값은 SideNavigation.js에서 설정
          if (document.getElementById(db_name).checked === true) { // 체크박스가 체크되면

            console.log(db_name);
            //*** 오른쪽 사이드바가 슬라이드되도록 해야함 ***
            // console.log(document.getElementById("right_nav_bar"));


              //아래 requests옵션에 넣어줄데이터
              const my_data = {
                  mydata: db_name
              };

              const requestOptions_2 = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  // body: JSON.stringify({title: 'React POST Request Example'}) postmen에서 body를
                  // 선택해서 보낼때랑 같은 원리임
                  body: JSON.stringify(my_data) // Db에 데이터 전송할때 여기에다가 넣어서 보낸다.
              };

              // *** 마커값을 받기위해서 board_2로 요청 ***
              
              const response_2 = fetch('http://192.168.0.8:3002/api/board_2', requestOptions_2).then(
                  res => res.json()
              )

              console.log("response_2 다음줄임");
              
              return response_2.then(data => {  // fetch에서 반환해주는 값을 Return해야 동기식으로 처리가됨
                  // console.log(data);
                  const lat_tt = data.lat_arr; // 서버로부터 lat배열을 받아옴
                  const lon_tt = data.lon_arr; // 서버로부터 lat배열을 받아옴
                  if (lat_tt.length === 0 || lon_tt.length === 0) { //서버로부터 데이터요청시 DB가없으면..
                    window.alert("데이터가 존재하지 않습니다.");
                    document.getElementById(db_name).checked = false;
                    return 
                  }
                  var markers_arr = []
                  var t_arr = [];
                  for (var i = 0; i < lat_tt.length-1; i++) {
                      t_arr.push(parseFloat(lon_tt[i]));
                      t_arr.push(parseFloat(lat_tt[i]));
                      markers_arr.push(t_arr);
                      t_arr = [];
                      // console.log("마커::" + lat_tt);
                      //아 여기 어제 마커 띄우는거 구현하다가 다른방식으로해서 여기는 필요가없네요
                      //여기 DB에서 정보가져오는거 테스트하다가 그대로 놔뒀네요 이렇게입니다.
                  }
                  // 쌓아진 마커들을 저장함
                  marker_feature_arr[db_name] = add_markers(markers_arr, db_name); // 마커를 지도에 추가하고 쌓은 마커들을 Return
                  // console.log(markers_arr);
                  // vectorlayer.setVisible(true) // Marker Visible...
                  vectorlayer.setVisible(false);
                  vectorlayer.setVisible(true);

                // To-do
                // *** 여기에서 Right_nav 동기화 To-do ***
                // dispatch(input_buis_Text(data.busi_arr)); //dispatch로 사업명 리스트를 리듀서에전달
                // 여기서 dispatch로 input_buid_text를 불러와버리니 
                // csv다운로드할때 select로 받아온 값들이 return값으로 buis_list배열을 반환해버리는 문제가 발생함!!

                // 여기에서 side_nav마커클릭하면  Sidenav_right에서 목록나오도록 하면됨
                // board_2에서 반환하고 있는내용
                // data.busi_arr 로 받으면됨
                // res.json({"lon_arr":lon_arr, "lat_arr":lat_arr, "busi_arr": busi_arr}) 
                

                  

                // https://jsfiddle.net/kq9gwdos/ 웹프론트엔드 썰님이해주신거
                //   fetch('http://192.168.0.8:3002/api/field_distinct', requestOptions_3).then(
                //     res_2 => res_2.json()
                // ) 
              });
            
              // // 여기서 MongoDB에 접속해야함 const response = fetch('http://192.168.0.8:3002/api/board',
              // // requestOptions).then(     res => res.json())  그런다음 응답으로 json형식으로 응답을 한다.
              // // .then(my_name => my_name.setState({my_name})); writer라는것을 보내준다.
              // const response_2 = fetch('http://192.168.0.8:3002/api/board_2', requestOptions_2).then(
              //     res => res.json()
              // ) // 그런다음 응답으로 json형식으로 응답을 한다.

              // // .then(my_name => my_name.setState({my_name})); data 를 받아와서 username
              // // console.log(response_2.data); response_2.then(data =>
              // // console.log(data.lat_arr));   배열로 반환 response_2.then(data =>
              // // console.log(data.lon_arr));   배열로 반환
              // response_2.then(data => {
              //     const lat_tt = data.lat_arr; // 서버로부터 lat배열을 받아옴
              //     const lon_tt = data.lon_arr; // 서버로부터 lat배열을 받아옴
              //     console.log(lat_tt);
              // })
              
              
              // console.log("on")
          } else {  // 마커 체크를 해제했을대 Layer를 끄도록한다.
              // vectorlayer.setVisible(false)
              // marker_obj[db_name].setVisible(false);
              // pointFeature_test[db_name] = new Feature({geometry: {}}); 
              // console.log(marker_feature_arr[db_name]); //쌓아진 마커들이 있음

              for(var i  = 0; i< marker_feature_arr[db_name].length; i++){
                vectorsource_test.removeFeature(marker_feature_arr[db_name][i]);
              }
              vectorlayer.setSource(vectorsource_test);
              // console.log("off")
          }
      };
  }


req_db_data("Manila_clam"); // (SideNavigation.js에서 데이터 추가)
req_db_data("Surf_clam"); // (SideNavigation.js에서 데이터 추가)
req_db_data("chinese_cyclina"); // (SideNavigation.js에서 데이터 추가)
req_db_data("Clam"); // (SideNavigation.js에서 데이터 추가)
req_db_data("cockle"); // (SideNavigation.js에서 데이터 추가)
req_db_data("Razor_clam"); // (SideNavigation.js에서 데이터 추가)

// req_db_data_2("Manila_clam"); // (SideNavigation.js에서 데이터 추가)
// req_db_data_2("Surf_clam"); // (SideNavigation.js에서 데이터 추가)
// req_db_data_2("chinese_cyclina"); // (SideNavigation.js에서 데이터 추가)
// req_db_data_2("Clam"); // (SideNavigation.js에서 데이터 추가)
// req_db_data_2("cockle"); // (SideNavigation.js에서 데이터 추가)
// req_db_data_2("Razor_clam"); // (SideNavigation.js에서 데이터 추가)
// const selectElement = document.getElementById('test_1').checked = true;
// console.log(selectElement);
//************************************************  
    setMapObj({ map })
    return () => map.setTarget(undefined)
  }, [])
  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>
}

export default Map