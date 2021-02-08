import React, { Component } from 'react';
import Chart from "chart.js";

class BarChart extends Component {

    constructor(props) {
        super(props)
        this.state = null;
        this.chartRef = React.createRef()
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(v => v.destination)
        this.myChart.data.datasets[0].data = this.props.data.map(v => v.numberOfFollowers)
        this.myChart.update()
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
                labels: this.props.data.map(v => v.destination),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(v => v.numberOfFollowers),
                    backgroundColor: this.props.color,
                }]

            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 10,
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
            
                <canvas ref={this.chartRef} />
            
        );
    }
}

export default BarChart;