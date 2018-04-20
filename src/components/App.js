import React from 'react'
import FileUploader from './FileUploader'
import Chart from './Chart'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(data) {
        this.setState(() => ({
            data: data
        }));
    }

    render() {
        return (
            <div className="container">
                <FileUploader handleFileChange={this.handleFileChange}/>
                <Chart data={this.state.data}/>
            </div>
        );
    }
}