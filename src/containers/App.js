import React, { Component } from 'react';
import './App.css';
import {Header} from '../components/header/header';

class App extends Component {
  headerTitle = "Expenses";

  render() {
    return (
        <div>
          <Header name={this.headerTitle}/>
          <div>This is the content</div>
        </div>
    );
  }
}

export default App;
