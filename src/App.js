import { ThemeProvider } from '@mui/material/styles';

import './styles.css'
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import  {GlobalTheme}  from './theme/GlobalTheme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import UserTable from './pages/UserTable'
import Admin from './pages/Admin'
import Tables from './pages/Tables'
import AdminTablesDetail from './pages/AdminTablesDetail'

const App = () => {

  return (
    <div className='App'>
      <ThemeProvider theme={GlobalTheme}>
      <BrowserRouter>
          <div>
            <Navbar />
            <Route path="/" exact component={Home} />
            <Route path="/menu/:id" component={Menu} />
            <Route path="/usertable" component={UserTable} />
            <Route path="/admin" component={Admin} />
            <Route path="/tables" component={Tables} />
            <Route path="/admintablesdetail/:id" component={AdminTablesDetail} />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
