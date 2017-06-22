import React from 'react';
import { connect } from 'dva';
import { Radio, Row, Col,Button } from 'antd';
import SearchContent from "../components/content/search.content.js";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const SearchPage = function({dispatch,data,loading,login} ){
    return (
        <SearchContent
            dispatch={dispatch}
            data={data}
            loading={loading}
            login={login}
        />
    );
}

SearchPage.propTypes = {};

export default connect(({data,login,loading})=>{return {login,data,loading};})(SearchPage);