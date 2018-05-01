import React from "react";
import {connect} from 'react-redux';
import {store, addData, removeData} from "../redux";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddLeft = this.handleAddLeft.bind(this);
        this.handleAddRight = this.handleAddRight.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleAddLeft() {
        store.dispatch(addData(this.props.index));
    }

    handleAddRight() {
        store.dispatch(addData(this.props.index + 1));
    }

    handleRemove() {
        store.dispatch(removeData(this.props.index));
    }

    render() {
        return (
            <div>
                <button onClick={this.handleAddLeft}>Add to Left</button>
                <button onClick={this.handleAddRight}>Add to Right</button>
                <button onClick={this.handleRemove} disabled={this.props.length === 1}>Remove</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        length: state.views.length
    };
};

export default connect(mapStateToProps)(Menu);