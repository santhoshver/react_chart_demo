import React from 'react';
import axios from 'axios';
import PieChart from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { INVOICE_URL } from './invoice.constants';

export default class InvoiceChartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invoiceData: [],
            options: {
                title: {
                    text: 'Sales Statistics'
                },

                xAxis: {
                    categories: [],
                    title: {
                        text: 'Month'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Sales amount'
                    }
                },
                series: [
                    {   name: 'Sales',
                        type: "column",
                        data: []
                    }
                ]
            }
        };
    }

    componentDidMount() {
        this.fetchInvoiceData();
    }

    fetchInvoiceData() {
        axios.get(INVOICE_URL.GET_INVOICES)
            .then(res => {
                res.data.map((item) => {
                    item['y'] = item.sales;
                    // item['x'] = item.income;
                    item['name'] = item.month
                    return item;
                });
                this.setState(prevState => ({
                    options: {
                        title: prevState.options.title,
                        xAxis: {
                            categories: res.data.map(item => item.month)
                        },
                        series: [{
                            data: res.data,
                            type: prevState.options.series[0].type
                        }]
                    }
                }));

                console.log(this.state);
            });
    }

    render() {
        return (
            <div>
                <PieChart
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </div>
        );
    }
}