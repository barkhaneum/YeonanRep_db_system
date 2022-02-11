import React, {useState, useRef} from "react";
import {AiOutlineConsoleSql, AiOutlineMenu} from "react-icons/ai";
import {FaGem, FaHeart, FaExclamationCircle, FaExclamation, FaDatabase} from "react-icons/fa";
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {Link} from "react-router-dom";

import CustomCheckBox from "./CustomCheckBox"
import { CSVLink, CSVDownload } from "react-csv";
import { get } from "jquery";
import { Button } from 'react-bootstrap'

//Redux사용
import {useDispatch, useSelector} from "react-redux";
import { checkbox_state, checked } from "../../modules/checkbox_state"; // 액션함수를 가져온다.


//*** To-do  여기서 CSV다운로드가 클릭되면 체크박스에 체크된것을 확인하고 다운로드할수 있도록 변경 ***

const SideNavigation = (props) => {

    //*** store에 있는 상태값을 가져오기 위해 react-Redux를 사용한다. ***/
    // const dispatch = useDispatch()
    // dispatch(checked()) //--> 리듀서 상태를 직접접근하는방법? 
    // const test_redux = useSelector((state) => state.test_redux.ischecked);
    // console.log(test_redux);
    //******************************************************************


    // *** CSV 다운로드 로직 *** 
    const headers = [{key : "lon_arr", label: "dsdsd"}]
    const [transactionData, setTransactionData] = useState([])
    const csvLink = useRef()
    const getTransactionData =  async() => {
        console.log("transactionData");
        if (document.getElementById("clam").checked === true) { // 체크박스가 체크되어있으면
    
            const my_data = {
                mydata: "clam"
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
        }
    };
    // *************************************** 

    const [collapsed, setCollapsed] = useState(false); // true,false에 따라 접엇다 폇다

    const [checkbox_state, setcheckbox_state] = useState("");

    const textChangeHandler = (e) => {
    setcheckbox_state(e.currentTarget.value);
    console.log("체크박스가 변함")
    }

    const submitText = () => {
        props.propFunction(checkbox_state)
    }
        
    
    // added styles
    const styles = {
        sideBarHeight: {
            height: "100vh"
        },
        menuIcon: {
            float: "right",
            margin: "10px"
        }
    };
    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
    };

    return (
        <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
            <SidebarHeader>
                <div style={styles.menuIcon} onClick={onClickMenuIcon}>
                    <AiOutlineMenu/>
                </div>
            </SidebarHeader>
            <Menu iconShape="square">
                <MenuItem icon={<FaDatabase />}>
                    데이터없음</MenuItem>
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

                <SubMenu title="패류 데이터 종합" icon={<FaDatabase />}>
                    {/* <MenuItem><CustomCheckBox title="2013 양식적지" id="test_1"/></MenuItem> */}
                    <MenuItem><CustomCheckBox title="바지락 데이터" id="Manila_clam"/></MenuItem>
                    <MenuItem><CustomCheckBox title="동죽 데이터" id="Surf_clam"/></MenuItem>
                    <MenuItem><CustomCheckBox title="가무락 데이터" id="chinese_cyclina"/></MenuItem>
                    <MenuItem><CustomCheckBox title="백합 데이터" id="Clam" onChange={textChangeHandler} onClick = {submitText}/></MenuItem>
                    <MenuItem><CustomCheckBox title="꼬막 데이터" id="cockle"/></MenuItem>
                    <MenuItem><CustomCheckBox title="가리맛 데이터" id="Razor_clam"/></MenuItem>
                </SubMenu>

            </Menu>
        </ProSidebar>
    );
  
    
};


export default SideNavigation;


