import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import UserTable from '../pages/UserTable'
const App = () => {
  return (
    <div className='App'>
     <BrowserRouter>
        <div>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/menu/:id" component={Menu} />
          <Route path="/usertable" component={UserTable} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
