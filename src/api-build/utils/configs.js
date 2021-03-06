"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _configs = require("../../utils/configs");

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    server: _configs2.default.server,
    apiPort: _configs2.default.apiPort,
    serverPort: _configs2.default.serverPort,
    domain: _configs2.default.domain,
    remoteServer: "http://120.76.204.189", //http://192.168.1.129:9300/ http://183.234.63.50
    remotePort: "9900",
    remoteApis: {
        login: "/api/user/login",
        countryList: "/api/organ/detail/",
        countryReport: "/api/report/applyReportList",
        villageReport: "/api/roster/datlstsbyorgid",
        getChildDetails: "/api/roster/detail",
        shenhe: "/api/audit/audit",
        changePassword: "/api/user/modifyPwd",
        downloadChild: "/api/export/rosterInfo",
        downloadCountry: "/api/export/rosterLsts",
        downloadOrg: "/api/export/statistical",
        searchChildren: "/api/roster/getLsts",
        countryCheckReport: "/api/safeguard/count",
        villageCheckList: "/api/safeguard/list",
        downloadOrgForCheck: "/api/export/exportSafeguardReports",
        downloadCountryForCheck: "/api/export/exportSafeguardLists"
    },
    reloadResponse: {
        code: 0,
        msg: "no auth"
    },
    codeErrorResponse: {
        code: -1,
        msg: "img code error"
    },
    getServerUrl: function getServerUrl(param) {
        if (this.remoteApis.hasOwnProperty(param)) {
            return this.remoteServer + ":" + this.remotePort + this.remoteApis[param];
        } else {
            throw "please check yunposAPIname, your input [" + prarm + "] does not exists!";
        }
    }
};

exports.default = config;
//# sourceMappingURL=configs.js.map