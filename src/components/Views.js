import React from "react";
import View from './View';
import {connect} from 'react-redux';

const Views = (props) => {
    return (
        <div id="views--div">
            {
                props.views.map((element, index) => {
                    return (<View key={'chart_' + index} index={index}/>)
                })
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        views: state.views
    };
};

export default connect(mapStateToProps)(Views);