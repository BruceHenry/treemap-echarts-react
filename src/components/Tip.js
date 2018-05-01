import React from "react";
import {connect} from 'react-redux';
import {store, closeTip, hideTip} from "../redux";

class Tip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleClose() {
        if (this.state.checked)
            store.dispatch(hideTip());
        else
            store.dispatch(closeTip());
    }

    handleCheckbox(event) {
        const checked = event.target.checked;
        this.setState(() => ({
            checked: checked
        }));
    }

    render() {
        return (
            <div id="tip--div">
                {!this.props.doNotShowAgain && this.props.showTip &&
                <div>
                    <div id="close--div">
                        <span id="checkbox--span">Do not show again
                            <input type="checkbox" id="checkbox--input" onChange={this.handleCheckbox}/>
                        </span>
                        <button onClick={this.handleClose} id="close--button"><b>X</b></button>
                    </div>
                    <div id="sample--div">
                        <div><b>Sample CSV: </b></div>
                        <table>
                            <tbody>
                            <tr>
                                <th>Class Name</th>
                                <th>Item Name</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>A</td>
                                <td>a1</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>A</td>
                                <td>a2</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td>b1</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showTip: state.showTip,
        doNotShowAgain: state.doNotShowAgain
    };
};

export default connect(mapStateToProps)(Tip);