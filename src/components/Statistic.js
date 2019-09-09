import React, { Component } from 'react';
import Chart from 'react-google-charts';

class Statistic extends Component {
  duration_options = {
    title: 'Calls Duration by Day',
    //hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    // For the legend to fit, we make the chart area smaller
    chartArea: { width: '50%', height: '70%' },
    // lineWidth: 25
  }

  amount_options = {
    title: 'Calls and Cost by Day',
    //hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    // For the legend to fit, we make the chart area smaller
    chartArea: { width: '50%', height: '70%' },
    // lineWidth: 25
  }

  caller_options = {
    title: 'Caller by Day',
    vAxis: { minValue: 0 },
    // For the legend to fit, we make the chart area smaller
    chartArea: { width: '50%', height: '70%' },
    // lineWidth: 25
  }

  callee_options = {
    title: 'Callee by Day',
    vAxis: { minValue: 0 },
    // For the legend to fit, we make the chart area smaller
    chartArea: { width: '50%', height: '70%' },
    // lineWidth: 25
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>
              <Chart
                width={450}
                height={200}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={this.props.duration_data}
                options={this.duration_options}
              />
              <Chart
                width={450}
                height={200}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={this.props.caller_data}
                options={this.caller_options}
              />
            </td>
            <td>
            <Chart
              width={450}
              height={200}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.props.amount_data}
              options={this.amount_options}
            />
            <Chart
              width={450}
              height={200}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={this.props.callee_data}
              options={this.callee_options}
            />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Statistic;
