import React, { Component } from 'react';
import { notification } from 'antd';

import Statistic from './Statistic';
import List from './List';
import Form from './Form';
import axios, { CALLERS, CALLER_STATISTICS } from '../config/axios';

import 'antd/dist/antd.css';

const messages = {
  success: message => {
    notification['success']({
      message: 'Success',
      description: message
    });
  },
  error: message => {
    notification['error']({
      message: 'Error',
      description: message
    });
  }
};

class App extends Component {
  state = {
    calls: [],
    currentPage: 1,
    totalItems: 0,
    loading: false,
    statistics_duration_data: [],
    statistics_amount_data: [],
    statistics_caller_data: [],
    statistics_callee_data: []
  };

  componentDidMount() {
    this.fetchCalls();
    this.fetchStatistics();
  }

  fetchCalls = async () => {
    try {
      this.setState({ loading: true });

      const { data } = await axios.get(CALLERS, {
        params: {
          page: this.state.currentPage
        }
      });

      this.setState({ calls: data.content, totalItems: data.totalElements });
    } catch (error) {
      console.error(error);
      messages.error('Error while trying to load the list of calls.');
    }

    this.setState({ loading: false });
  };

  fetchStatistics = async () => {
    try {
      this.setState({ loading: true });

      const { data } = await axios.get(CALLER_STATISTICS);

      const _statistics_duration_data = [
        ['Day', 'Inbound', 'Outbount']
      ]
      const _statistics_amount_data = [
        ['Day', 'Amount', 'Cost']
      ]
      const _statistics_caller_data = []
      const _statistics_callee_data = []

      for (let i = 1; i < data.mCaller.length; i++) {
        const line = data.mCaller[i];
        for (let j = 1; j < line.length; j++) {
            if (data.mCaller[i][j] === null) {
              data.mCaller[i][j] = 0
            } else {
              data.mCaller[i][j] = parseInt(data.mCaller[i][j])
            }
          }
      }

      for (let i = 1; i < data.mCallee.length; i++) {
        const line = data.mCallee[i];

        for (let j = 1; j < line.length; j++) {
            if (data.mCallee[i][j] === null) {
              data.mCallee[i][j] = 0
            } else {
              data.mCallee[i][j] = parseInt(data.mCallee[i][j])
            }
        }
      }

      for (let i = 0; i < data.mCaller.length; i++) {
        _statistics_caller_data.push(data.mCaller[i])
      }

      for (let i = 0; i < data.mCallee.length; i++) {
        _statistics_callee_data.push(data.mCallee[i])
      }

      data.listStatisticsDayTO.map((s) => {
        _statistics_duration_data.push([s.day, parseInt(s.durationInbound.replace('PT','').replace('M','')), parseInt(s.durationOutbound.replace('PT','').replace('M',''))])
        _statistics_amount_data.push([s.day, s.amount, s.cost])
      });

      console.log(_statistics_duration_data)

      this.setState( {
        statistics_duration_data: _statistics_duration_data,
        statistics_amount_data: _statistics_amount_data,
        statistics_caller_data: _statistics_caller_data,
        statistics_callee_data: _statistics_callee_data
      });
    } catch (error) {
      console.error(error);
      messages.error('Error while trying to load the list of calls.');
    }

    this.setState({ loading: false });
  };

  saveCall = async (call, onSuccess) => {
    try {
      await axios.post(CALLERS, {
        calls: [call]
      });

      this.fetchCalls();
      this.fetchStatistics();
      onSuccess();

      messages.success('Call added succesfully!');
    } catch (error) {
      console.error(error);
      messages.error('Error while trying to add the call.');
    }
  };

  onDelete = async id => {
    try {
      await axios.delete(`${CALLERS}/${id}`);
      this.fetchCalls();
      this.fetchStatistics();

      messages.success('Call deleted succesfully!');
    } catch (error) {
      console.error(error);
      messages.error('Error while trying to delete the call.');
    }
  };

  onPageChange = newPage =>
    this.setState({ currentPage: newPage }, this.fetchCalls, this.fetchStatistics);

  render() {
    const {
      calls,
      currentPage,
      totalItems,
      loading,
      statistics_duration_data,
      statistics_amount_data,
      statistics_caller_data,
      statistics_callee_data
    } = this.state;

    return (
      <div>
        <table>
          <tr>
            <td width="50%">
              <Form onSubmit={this.saveCall} />
            </td>
            <td>
              <Statistic
                duration_data={statistics_duration_data}
                amount_data={statistics_amount_data}
                caller_data={statistics_caller_data}
                callee_data={statistics_callee_data}
              />
            </td>
          </tr>
        </table>

        <List
          data={calls}
          currentPage={currentPage}
          totalItems={totalItems}
          onDelete={this.onDelete}
          onPageChange={this.onPageChange}
          loadingData={loading}
        />
      </div>
    );
  }
}

export default App;
