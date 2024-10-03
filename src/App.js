import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


export default class App extends Component {

  apiKey = process.env.REACT_API_NEWS_API;
  state = {
    progress : 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {

    return (
      <div>
      <Router>
       <Navbar />
       <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(this.state.progress)}
      />

       <Routes>
        <Route path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='home'  pageSize={6} country="us" category="business"/>} />
        <Route path='/business' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='business'  pageSize={6} country="us" category="business"/>} />
        <Route path='/entertainment' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='entertainment'  pageSize={6} country="us" category="entertainment"/>} />
        <Route path='/general' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='general'  pageSize={6} country="us" category="general"/>} />
        <Route path='/health' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='health'  pageSize={6} country="us" category="health"/>} />
        <Route path='/science' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='science'  pageSize={6} country="us" category="science"/>} />
        <Route path='/sports' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='sports'  pageSize={6} country="us" category="sports"/>} />
        <Route path='/technology' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='technology'  pageSize={6} country="us" category="technology"/>} />
       </Routes>
       
      </Router>
      </div>
    )
  }
}