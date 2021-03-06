import React from "react";
import ReactEcharts from 'echarts-for-react';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: (function () {
                let flag = false;
                return function () {
                    if (!flag) {
                        flag = true;
                        return !flag;
                    }
                    return flag;
                };
            })()
        };
    }

    getOption() {
        return {
            series: [{
                type: 'treemap',
                animationDuration:500,
                animationEasing: 'quinticOut',
                top: 10,
                width: '95%',
                height: '90%',
                data: this.props.data,
                roam: 'move',
                visibleMin: 100,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                upperLabel: {
                    normal: {
                        show: true,
                        height: 15
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                levels: [
                    {
                        itemStyle: {
                            normal: {
                                borderColor: '#777',
                                borderWidth: 0,
                                gapWidth: 1
                            }
                        },
                        upperLabel: {
                            normal: {
                                show: false
                            }
                        }
                    },
                    {
                        itemStyle: {
                            normal: {
                                borderColor: '#555',
                                borderWidth: 3,
                                gapWidth: 1
                            },
                            emphasis: {
                                borderColor: '#ddd'
                            }
                        }
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                                gapWidth: 1,
                                borderColorSaturation: 0.6
                            }
                        }
                    }
                ]
            }]
        };
    }

    render() {
        return (
            <div className="chart">
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    style={{height: '50rem', width: '40rem'}}
                    className='react_for_echarts'/>
            </div>
        );
    }
}