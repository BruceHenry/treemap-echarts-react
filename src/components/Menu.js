import React from "react";
import {connect} from 'react-redux';
import {store, addData, moveData, removeData} from "../redux";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.handleAddLeft = this.handleAddLeft.bind(this);
        this.handleAddRight = this.handleAddRight.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleMoveLeft() {
        store.dispatch(moveData(this.props.index, 'Left'));
    }

    handleMoveRight() {
        store.dispatch(moveData(this.props.index, 'Right'));
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
                <button onClick={this.handleMoveLeft} disabled={this.props.index === 0}>Move Left</button>
                <button onClick={this.handleMoveRight} disabled={this.props.index === this.props.length - 1}>
                    Move Right
                </button>
                <button onClick={this.handleAddLeft}>Add Left</button>
                <button onClick={this.handleAddRight}>Add Right</button>
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