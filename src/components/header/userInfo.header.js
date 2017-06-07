import { Popover, Button, Icon,Modal } from 'antd';
import React,{Component} from "react";
import styles from "./header.less";
import UserForm from "../forms/userInfo.form";

const ExportModal = function({visible,handleCancel}){
    return(
        <Modal
          title="修改账户信息"
          visible={visible}
          onCancel={handleCancel}
        >
         <UserForm />
        </Modal>
    );
};

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        };
    }
    modalHandler= ()=>{
        this.setState({
            visible: true
        });
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        });
    }
    render(){
        const {userInfo,handleLogout} =this.props;
        const text="用户信息";
        const content = (
            <div style={{padding: '0'}}>
                <ul className={styles.listItemUl}>
                    <li key="userinfo1">
                        <a onClick={this.modalHandler}>
                            <span>
                                <Icon type="solution" />
                            </span>
                            <p>编辑资料</p>
                        </a>
                    </li>
                    <li key="userinfo3">
                        <a onClick={handleLogout}>
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
                <ExportModal visible={this.state.visible} handleCancel={this.handleCancel}/>
                <Popover placement="bottomRight" content={content} trigger="hover" overlayClassName={styles.userInfoOverlay}>
                    <span className={styles.userInfoSpan} >账户信息</span>
                </Popover>
            </div>
        );
    }
}

export default UserInfo;