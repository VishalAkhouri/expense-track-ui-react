import React, { Component } from 'react';
import './App.scss';
import {Header} from '../components/header/header';
import {Navigator} from "../components/navigator/navigator";
import {CreateExpenses} from "./create/create-expenses";
import AppRouter from "../components/router/router";
import NavBar from '../components/navbar/nav-bar';

class App extends Component {
  headerTitle = "Expenses";

  render() {
    return (
        <div className='main-section'>
            <NavBar />
          <Header name={this.headerTitle}/>

          <AppRouter/>
            {/*<Navigator/>*/}
            {/*<CreateExpenses/>*/}
        </div>
    );
  }
}

export default App;
