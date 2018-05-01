import React from "react";
import FileUploader from "./FileUploader";
import Menu from "./Menu";
import Chart from "./Chart";
import {connect} from 'react-redux';

const View = (props) => {
    return (
        <div className="view--div">
            <div className="view--topbar--div">
                <FileUploader index={props.index}/>
                <Menu index={props.index}/>
            </div>
            <Chart data={props.data}/>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        data: state.views[props.index]
    };
};

export default connect(mapStateToProps)(View);