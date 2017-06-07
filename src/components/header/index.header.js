import {Menu} from "antd";
import styles from "./header.less";
import configs from "../../utils/configs";
import HeaderUserInfo from "./userInfo.header";

const Header = function({navList,userInfo,handleLogout}){
    return (
        <div id="header">
            <div className={styles.logo} >
                <p>{configs.logoTitle || "请在 /utils/configs.js 配置此LOGO"}</p>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '48px',marginLeft:"30%",height:"50px" }}
                id="navBar"
            >
                {navList.map((val,index)=>{
                    return (
                        <Menu.Item key={index+1} className="navBar">{val}</Menu.Item>
                    );
                })}
            </Menu>
            {userInfo && <HeaderUserInfo userInfo={userInfo} handleLogout={handleLogout} />}
        </div>
    );
}

export default Header;