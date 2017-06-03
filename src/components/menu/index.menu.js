import {Menu,Icon} from "antd";
import {Link} from "react-router";

const IndexMenu = function({mode,collapsed,menuList}){
    return(
        <Menu
            mode={mode}
            defaultSelectedKeys={['0']}
        >
            {menuList.map((val,index)=>{
                return (
                    <Menu.Item key={index}>
                        <Link to={val.link}>
                        <span>
                            <Icon type={val.icon} />
                            <span className="nav-text">{collapsed?null:val.text}</span>
                        </span>
                        </Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
}

export default IndexMenu;