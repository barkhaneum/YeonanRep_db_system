import {useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {FaGem, FaHeart} from "react-icons/fa";
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {Link} from "react-router-dom";

import CustomCheckBox from "./CustomCheckBox"

const SideNavigation = () => {
    const [collapsed, setCollapsed] = useState(false); // true,false에 따라 접엇다 폇다
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
                <MenuItem icon={<FaGem />}>
                    Dashboard</MenuItem>
                <MenuItem icon={<FaGem />}>Users</MenuItem>
                <SubMenu title="Reports" icon={<FaHeart />}>
                    <MenuItem>Track Report</MenuItem>
                    <MenuItem>Inventory Report</MenuItem>
                    <MenuItem>Customer Report</MenuItem>
                </SubMenu>
                <SubMenu title="Account" icon={<FaHeart />}>
                    <MenuItem>Permissions</MenuItem>
                    <MenuItem>Settings</MenuItem>
                </SubMenu>
                <SubMenu title="Email" icon={<FaHeart />}>
                    <MenuItem>Notification</MenuItem>
                </SubMenu>

                <SubMenu title="Email2" icon={<FaHeart />}>
                    <MenuItem><CustomCheckBox id="test_1"/></MenuItem>
                    <MenuItem><CustomCheckBox id="test_2"/></MenuItem>
                    <MenuItem><CustomCheckBox id="test_3"/></MenuItem>
                    <MenuItem><CustomCheckBox id="test_4"/></MenuItem>
                </SubMenu>

            </Menu>
        </ProSidebar>
    );
    
};
export default SideNavigation;


