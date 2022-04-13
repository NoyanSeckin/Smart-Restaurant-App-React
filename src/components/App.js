import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from '../pages/Home';
import Menu from '../pages/Menu';

const App = () => {
  return (
    <div className='App'>
     <BrowserRouter>
        <div>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/menu" component={Menu} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
