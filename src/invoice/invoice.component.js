import React from 'react';
import axios from 'axios';
import HighChart from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { INVOICE_URL } from './invoice.constants';

export default class InvoiceChartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invoiceData: [],
            generalOptions: {
                title: {
                    text: 'Sales Report'
                },

                xAxis: {
                    title: {
                        text: 'Customers'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Sales amount'
                    }
                },
                series: [
                    {   name: 'Sales',
                        data: []
                    }
                ]
            },
            barChartOptions: {},
            pieChartOptions: {}
        };
        this.buildChart = this.buildChart.bind(this);
    }

    componentDidMount() {
        this.fetchInvoiceData();
    }

    fetchInvoiceData() {
        axios.get(INVOICE_URL.GET_INVOICES)
            .then(res => {
                res.data.map((item) => {
                    item['y'] = item.salesTotal;
                    item['name'] = item.customerName
                    return item;
                });
                this.setState({
                    barChartOptions: this.buildChart('bar', res.data),
                    pieChartOptions: this.buildChart('pie', res.data)
                });
            });
    }

    buildChart(type, data) {
        console.log(this);
        return {
            title: this.state.generalOptions.title,
            xAxis: {
                categories: data.map(item => item.customerName)
            },
            series: [{
                data: data,
                type: type
            }]
        }
    }

    render() {
        return (
            <div>
                <HighChart
                    highcharts={Highcharts}
                    options={this.state.barChartOptions}
                />

                <HighChart
                    highcharts={Highcharts}
                    options={this.state.pieChartOptions}
                />
            </div>
        );
    }
}