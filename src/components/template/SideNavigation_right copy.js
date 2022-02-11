import React, {useState, useRef} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {FaGem, FaHeart, FaExclamationCircle, FaExclamation, FaDatabase} from "react-icons/fa"; // 아이콘들
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import {prosidebar_css} from "./prosidebar_style.css";
import {Link} from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import CustomCheckBox from "./CustomCheckBox"
import { Button } from 'react-bootstrap'

//Redux사용
import {useDispatch, useSelector} from "react-redux";



const SideNavigation_right = (props) => {

    // *** Redux 사용하기 ***
    const test_redux = useSelector((state) => state.test_redux);
    // const get_buis_list = useSelector((get_buis_list) => get_buis_list.buis_list);

    // test!
    const headers = [{key : "lon_arr", label: "dsdsd"}]
    // test!
    const [transactionData, setTransactionData] = useState([])
    const csvLink = useRef()

    // const increse = () => {
    //     // store에 있는 state 바꾸는 함수 실행
    //     dispatch(increseCount());
    //   };

    // test!
    const getTransactionData =  async() => { // CSV다운로드 버튼 클릭했을때!
        console.log("CSV 다운로드버튼 눌림");
        console.log(test_redux);
        // const test_redux = useSelector((state) => state.test_redux.ischecked);
        console.log(test_redux.id_list); // 체크박스에따라 Reducer의 상태값을 확인해보기!!!
        // dispatch(checked())

        //*** Redux 상태 체크 ***/
        // console.log(test_redux);

        if (test_redux.id_list.length > 0) { // 체크된상태가 1개이상이라면..
            var t_arr = [];
            for(var i = 0; i<test_redux.id_list.length; i++){
                t_arr.push({"sheet_name" : test_redux.id_list[i]});
            }
            console.log(t_arr);

            const my_data = {
                // mydata: props.props_test // CSV다운로드를 누르면 mydata를 서버로 전달
                // mydata: props.textValue // CSV다운로드를 누르면 mydata를 서버로 전달 --> App.js에서 props에 값을 직접 넣어줄경우
                mydata: t_arr
            };
            const requestOptions_2 = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(my_data)
            };
            fetch(
                'http://192.168.0.8:3002/api/data_lookup',
                requestOptions_2
            ).then((response) =>response.json())
            .then((json) => {
                // var tt = JSON.stringify(json, ['lon_arr'])
                // var tt = Object.values((json))
                console.log(json);
                setTransactionData((json)); //여기다가 데이터를 넣으면됨
                // console.log(JSON.stringify(json));
                
                csvLink.current.link.click()
            }).catch((error) => {
                // do anything with error
            });
            
            // .then(resJson => res_data = resJson); 
            // .then(data => {});
        } else {
            window.alert("데이터가 없습니다");
        }
    };

    const [collapsed, setCollapsed] = useState(props.bar_sw); // true,false에 따라 접엇다 폇다
    // added styles
    const styles = {
        sideBarHeight: {
            height: "100vh",
        },
        menuIcon: {
            float: "right",
            margin: "10px"
        },
    };
    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
    };

    return (
        <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
            <SidebarHeader>
                <div style = {styles.flex_direction}>
                    <div><CustomCheckBox title="전체선택" id=""/></div>
                    <div style={styles.menuIcon} onClick={onClickMenuIcon}>
                        <AiOutlineMenu/>
                    </div>
                </div>
            </SidebarHeader>
            <Menu iconShape="circle">
                {/* <MenuItem icon={<FaDatabase />}>
                    데이터없음</MenuItem> */}
                {/* <MenuItem icon={<FaDatabase />}>데이터없음</MenuItem> */}
                {/* <SubMenu title="데이터없음" icon={<FaDatabase />}>
                    <MenuItem>데이터없음_2</MenuItem>
                    <MenuItem>데이터없음_3</MenuItem>
                    <MenuItem>데이터없음_4</MenuItem>
                </SubMenu>
                <SubMenu title="데이터없음" icon={<FaDatabase />}>
                    <MenuItem>데이터없음_5</MenuItem>
                    <MenuItem>데이터없음_6</MenuItem>
                </SubMenu>
                <SubMenu title="데이터없음" icon={<FaDatabase />}>
                    <MenuItem>데이터없음_7</MenuItem>
                </SubMenu> */}
                <SubMenu title="사업지별" icon={<FaDatabase />}>
                    {/* <MenuItem><CustomCheckBox title="2013 양식적지" id="test_1"/></MenuItem> */}
                    <MenuItem><CustomCheckBox title="ddd" id=""/></MenuItem>
                    {/* <MenuItem><CustomCheckBox title="2016 화성적지조사" id=""/></MenuItem> */}
                    {/* <MenuItem><CustomCheckBox id="test_3"/></MenuItem>
                    <MenuItem><CustomCheckBox id="test_4"/></MenuItem> */}
                </SubMenu>

                <SubMenu title="지역별" icon={<FaDatabase />}>
                    {/* <MenuItem><CustomCheckBox title="2013 양식적지" id="test_1"/></MenuItem> */}
                    <MenuItem><CustomCheckBox title="충남" id=""/></MenuItem>
                    <MenuItem><CustomCheckBox title="경기" id=""/></MenuItem>
                </SubMenu>

                <SubMenu title="조사일자별" icon={<FaDatabase />}>
                    {/* <MenuItem><CustomCheckBox title="2013 양식적지" id="test_1"/></MenuItem> */}
                    <MenuItem><CustomCheckBox title="2016" id=""/></MenuItem>
                    <MenuItem><CustomCheckBox title="2017" id=""/></MenuItem>
                    <MenuItem><CustomCheckBox title="2018" id=""/></MenuItem>
                </SubMenu>
                

                <SubMenu title="CSV 다운로드" icon={<FaDatabase/>}>
                    {/* <button onClick = {global_get_data}> Download CSV</button> */}
                    <Button onClick = {getTransactionData} class="btn btn-primary">CSV다운로드</Button>
                </SubMenu>

                <SubMenu><CSVLink header = {headers} data={transactionData} className='hidden' ref = {csvLink} target='_blank' filename = {"test_csv_file"}>
                </CSVLink></SubMenu>

            </Menu>
        </ProSidebar>
    );
    
};
export default SideNavigation_right;


