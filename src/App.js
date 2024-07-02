import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apikey="71071e225a1046c5b5e0959a1c9e751b"

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={5} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={5} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country="in" category="general" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={5} country="in" category="science" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={5} country="in" category="health" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={5} country="in" category="technology" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={5} country="in" category="sports" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
