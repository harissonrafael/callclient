import React, { Component } from 'react';
import Statistic from './Statistic';
import List from './List';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <h1>Hello Word</h1>
        <Statistic />
        <List />
      </div>
    );
  }
}

export default App;
