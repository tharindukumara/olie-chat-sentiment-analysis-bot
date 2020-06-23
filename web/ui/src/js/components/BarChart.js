import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Text } from 'grommet';


class BarChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: [this.props.positive, this.props.negative]
            }],
            dataLabels: {
                enabled: false,
            },
            options: {
                chart: {
                    type: 'bar',
                    height: 100,
                    toolbar: {
                        show: false
                      },
                },
                labels: {
                    show: false
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                  },
                xaxis: {
                    categories: ['Positive', 'Negative'],
                    show: false,
                    visible: false,
                    labels: {
                        show: false,
                    },
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: false,
                    },
                    crosshairs: {
                        show: false
                    }
                },
                yaxis: {
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                crosshairs: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                    offsetX: 0,
                },
            }
        };
    }

    render() {
        return (
            <Box size="medium">
                <Text>This is how the values!!!</Text>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={130} />
            </Box>
        );
    }
}

export default BarChat;
