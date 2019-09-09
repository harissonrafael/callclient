import React, { Component } from 'react';
import { Table, Tag, Button, Card, Spin, Popconfirm, Icon } from 'antd';

const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

class List extends Component {
  handleDelete(id) {
    this.props.onDelete(id);
  }

  componentWillMount() {}

  columns = [
    {
      title: 'Caller',
      dataIndex: 'callerNumber',
      key: 'callerNumber'
    },
    {
      title: 'Callee',
      dataIndex: 'calleeNumber',
      key: 'calleeNumber'
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: start => (
        <span>{new Date(start).toLocaleDateString('pt-PT', dateOptions)}</span>
      )
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
      render: end => (
        <span>{new Date(end).toLocaleDateString('pt-PT', dateOptions)}</span>
      )
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: type => (
        <span>
          {
            <Tag color={type === 'OUTBOUND' ? 'geekblue' : 'green'} key={type}>
              {type.toUpperCase()}
            </Tag>
          }
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title='Are you sure delete this call?'
          icon={<Icon type='question-circle-o' style={{ color: 'red' }} />}
          onConfirm={() => this.handleDelete(record.id)}
        >
          <Button type='danger' icon='delete' />
        </Popconfirm>
      )
    }
  ];

  render() {
    const {
      data,
      loadingData,
      onPageChange: onChange,
      currentPage: current,
      totalItems: total
    } = this.props;

    return (
      <div>
        <div
          style={{
            paddingRight: '30px',
            paddingBottom: '30px',
            paddingLeft: '30px'
          }}
        >
          <Card title='List'>
            <Spin spinning={loadingData} tip='Loadind calls...'>
              <Table
                pagination={{ current, total, onChange }}
                columns={this.columns}
                dataSource={data.map(call => ({
                  ...call,
                  key: call.id
                }))}
              />
            </Spin>
          </Card>
        </div>
      </div>
    );
  }
}

export default List;
