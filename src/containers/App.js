import React, { Component } from 'react';
import './App.scss';
import {Header} from '../components/header/header';
import {Navigator} from "../components/navigator/navigator";
import {CreateExpenses} from "./create/create-expenses";

class App extends Component {
  headerTitle = "Expenses";

  render() {
    return (
        <div>
          <Header name={this.headerTitle}/>
          <div>This is the content</div>
            <Navigator/>
            <CreateExpenses/>
        </div>
    );
  }
}

export default App;
