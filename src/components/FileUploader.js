import React from "react";
import {store, editData} from "../redux";

export default class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    static parseCSV(data) {
        const lines = data.split('\n');
        const temp = {};
        for (let line of lines) {
            let columns = line.split(',');
            if (columns.length !== 3)
                continue;
            let c = columns[0], name = columns[1], value = parseInt(columns[2]);
            if (isNaN(value))
                continue;
            if (!temp.hasOwnProperty(c))
                temp[c] = {};
            if (temp[c].hasOwnProperty(name))
                temp[c][name] += value;
            else
                temp[c][name] = value;
        }
        const result = [];
        for (let c in temp) {
            if (temp.hasOwnProperty(c)) {
                let sum = 0;
                for (let item in temp[c])
                    if (temp[c].hasOwnProperty(item))
                        sum += temp[c][item];
                result.push({name: c, value: sum, children: []});
                for (let item in temp[c])
                    if (temp[c].hasOwnProperty(item))
                        result[result.length - 1].children.push({name: item, value: temp[c][item]});
            }
        }
        return result;
    }

    handleFileChange(event) {
        const reader = new FileReader();
        reader.onload = () => {
            store.dispatch(editData(this.props.index, FileUploader.parseCSV(reader.result)));
        };
        if (event.target.files.length > 0)
            reader.readAsText(event.target.files[0]);
    }

    render() {
        return (
            <div className="file-input" id="file-input">
                <input type="file" onChange={this.handleFileChange}/>
            </div>
        );
    }
}