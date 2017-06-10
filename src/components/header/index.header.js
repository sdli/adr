import {Menu} from "antd";
import styles from "./header.less";
import configs from "../../utils/configs";
import HeaderUserInfo from "./userInfo.header";

const Statistic= function({obj}){
    let list = [{
            title: "已通过",
            value: obj.inAuditCount
        },{
            title: "未提交",
            value: obj.notAuditCount
        },
        {
            title:"已通过",
            value:obj.passCount
        },{
            title:"被驳回",
            value:obj.refuseCount
        }
        ];
    return (
        <div className={styles.static}>
            <ul>
                {list.map((val,index)=>{
                    return (
                        <li>
                            <p>{val.value}</p>
                            <p>{val.title}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
const Header = function({navList,userInfo,handleLogout,dispatch,changePassword,alertMsg,applyStatusReport}){
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
            <Statistic obj={applyStatusReport} /> 
            <HeaderUserInfo userInfo={userInfo} handleLogout={handleLogout} dispatch={dispatch} changePassword={changePassword} alertMsg={alertMsg}/>
        </div>
    );
}

export default Header;