import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
componentDidMount(){
  axios.get('/api/product/brand').then(response => {
    console.log(response);
  })
}

  render() {
    return (
      <div>
        Hello React
      </div>
    )
  }
}


export default App;
