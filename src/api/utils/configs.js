import ServerConfig from "../../utils/configs";

const config = {
        server:ServerConfig.server,
        apiPort: ServerConfig.apiPort,
        serverPort: ServerConfig.serverPort,
        remoteServer: "http://120.76.204.189",//http://192.168.1.129:9300/ http://183.234.63.50
        remotePort: "9900",
        remoteApis:{
            login: "/api/user/login",
            countryList: "/api/organ/detail/",
            countryReport: "/api/report/applyReportList/",
            villageReport: "/api/roster/datlstsbyorgid",
            getChildDetails: "/api/roster/detail",
            shenhe:"/api/audit/audit",
            changePassword:"/api/user/modifyPwd"
        },
        reloadResponse:{
            code:0,
            msg:"no auth"
        },
        getServerUrl: function(param){
            if(this.remoteApis.hasOwnProperty(param)){
                return this.remoteServer+":"+this.remotePort + this.remoteApis[param];
            }else{
                throw "please check yunposAPIname, your input [" + prarm + "] does not exists!";
            }
        }
};

export default config;