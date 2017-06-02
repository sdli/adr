import {Menu} from "antd";
import styles from "./header.less";
import configs from "../../utils/configs";

const Header = function(){
    return (
        <div id="#header">
            <div className={styles.logo} >
                <p>{configs.logoTitle || "请配置此LOGO"}</p>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
            </Menu>
        </div>
    );
}

export default Header;