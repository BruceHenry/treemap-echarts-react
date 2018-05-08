import React from "react";
import {store, editData} from "../redux";

export default class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    static parseCSV(data) {
        const lines = data.split('\n');
        const treemap_data = {};
        for (let line of lines) {
            let columns = line.split(',');
            if (columns.length !== 3)
                continue;
            let class_name = columns[0], name = columns[1], value = parseInt(columns[2]);
            if (isNaN(value))
                continue;
            if (!treemap_data.hasOwnProperty(class_name))
                treemap_data[class_name] = {};
            if (treemap_data[class_name].hasOwnProperty(name))
                treemap_data[class_name][name] += value;
            else
                treemap_data[class_name][name] = value;
        }
        const result = [];
        for (let c in treemap_data) {
            if (treemap_data.hasOwnProperty(c)) {
                let sum = 0;
                for (let item in treemap_data[c])
                    if (treemap_data[c].hasOwnProperty(item))
                        sum += treemap_data[c][item];
                result.push({name: c, value: sum, children: []});
                for (let item in treemap_data[c])
                    if (treemap_data[c].hasOwnProperty(item))
                        result[result.length - 1].children.push({name: item, value: treemap_data[c][item]});
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
        event.target.value = ''
    }

    render() {
        return (
            <div className="file-input" id="file-input">
                <input type="file" onChange={this.handleFileChange}/>
            </div>
        );
    }
}