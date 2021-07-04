import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';
import SingleMovie from './pages/SingleMovie';
import './App.css';
// import { useGlobalContext } from '../context';

const App = () => {
  // const {movieCategory} = useGlobalContext();
  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route exact path='/'>
            <div className='home'>
              <div className='container'>
                <div className='row'>
                  <Home/>
                </div>
              </div>
            </div>
          </Route>
          <Route exact path='/movie/:id'>
            <SingleMovie/>
          </Route>
          <Route exact path='*'>
            <Error/>
          </Route>
      </Switch>
    </Router>
  )
}

export default App
