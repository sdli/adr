import configs from "../../utils/configs"; 

const footerContent = function(){
    return (
        <div style={{textAlign:"center"}}>
            {configs.footerTitle}
            <br />
            {configs.footerSubtitle}
        </div>
    );
};

export default footerContent;