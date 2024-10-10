import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


const App = ()=> {

  const apiKey = process.env.REACT_APP_NEWS_API;
  

  const [progress,setProgress] = useState(0);

    return (
      <div>
      <Router>
       <Navbar />
       <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(progress)}
      />

       <Routes>
        <Route path='/' element={<News apiKey={apiKey} setProgress={setProgress} key='home'  pageSize={6} country="us" category="business"/>} />
        <Route path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key='business'  pageSize={6} country="us" category="business"/>} />
        <Route path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key='entertainment'  pageSize={6} country="us" category="entertainment"/>} />
        <Route path='/general' element={<News apiKey={apiKey} setProgress={setProgress} key='general'  pageSize={6} country="us" category="general"/>} />
        <Route path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key='health'  pageSize={6} country="us" category="health"/>} />
        <Route path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key='science'  pageSize={6} country="us" category="science"/>} />
        <Route path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key='sports'  pageSize={6} country="us" category="sports"/>} />
        <Route path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key='technology'  pageSize={6} country="us" category="technology"/>} />
       </Routes>
       
      </Router>
      </div>
    )
}

export default App;