import { Popover, Button, Icon } from 'antd';
import React,{Component} from "react";
import styles from "./header.less";

class UserInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {userInfo} =this.props;
        const text="用户信息";
        const content = (
            <div style={{padding: '0'}}>
                <ul className={styles.listItemUl}>
                    <li key="userinfo1">
                        <a href="">
                            <span>
                                <Icon type="solution" />
                            </span>
                            <p>编辑资料</p>
                        </a>
                    </li>
                    <li key="userinfo3">
                        <a href="">
                            <span>
                                <Icon type="poweroff" />
                            </span>
                            <p>退出登录</p>
                        </a>
                    </li>
                </ul>
            </div>
        );
        return(
            <div className={styles.userInfoArea}>
                <Popover placement="bottomRight" content={content} trigger="hover" overlayClassName={styles.userInfoOverlay}>
                    <span className={styles.userInfoSpan} >账户信息</span>
                </Popover>
            </div>
        );
    }
}

export default UserInfo;