import {Menu} from "antd";
import styles from "./header.less";
import configs from "../../utils/configs";
import HeaderUserInfo from "./userInfo.header";

const Header = function({navList,userInfo,handleLogout,dispatch,changePassword,alertMsg}){
    return (
        <div id="header">
            <div className={styles.logo} >
                <p>{configs.logoTitle || "请在 /utils/configs.js 配置此LOGO"}</p>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '48px',marginLeft:"200px",height:"50px" }}
                id="navBar"
            >
                {navList.map((val,index)=>{
                    return (
                        <Menu.Item key={index+1} className="navBar">{val}</Menu.Item>
                    );
                })}
            </Menu>
            <HeaderUserInfo userInfo={userInfo} handleLogout={handleLogout} dispatch={dispatch} changePassword={changePassword} alertMsg={alertMsg}/>
        </div>
    );
}

export default Header;