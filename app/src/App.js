import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Document from './pages/Document';
import Documents from './pages/Documents';
import Login from './pages/Login';
import Register from './pages/Register';
import Loading from './pages/Loading';
import { Suspense, useState, useEffect } from 'react';
import { AppBar } from './components'


function App() {

  const [currentRoute, setCurrentRoute] = useState('/')
  console.log(currentRoute)

  return (
    <Router>
        {
          currentRoute !== '/login' && currentRoute !=='/register' ? <AppBar/> : ''
        }
        <Suspense suspense = {<Loading/>}/>

        <Routes>
          <Route path='/document' element={<Document setCurrentRoute={setCurrentRoute}/>} />
          <Route path='/document/:id' element={<Documents setCurrentRoute={setCurrentRoute}/>} />
          <Route path='/login' element={<Login setCurrentRoute={setCurrentRoute}/>} />
          <Route path='/register' element={<Register setCurrentRoute={setCurrentRoute}/>} />
        </Routes>

    </Router>

  );
}

export default App;
