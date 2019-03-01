import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav  className="nav" />
        <Header className="head-form" />             
      </div>
    );
  }
}

export default App;
