import {Menu,Icon} from "antd";

const IndexMenu = function({mode,collapsed,menuList}){
    return(
        <Menu
            mode={mode}
            defaultSelectedKeys={['1']}
        >
            {menuList.map((val,index)=>{
                return (
                    <Menu.Item key={index}>
                        <span>
                            <Icon type={val.icon} />
                            <span className="nav-text">{collapsed?null:val.text}</span>
                        </span>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
}

export default IndexMenu;