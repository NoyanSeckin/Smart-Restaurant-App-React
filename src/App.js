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
import ProtectedRoute from './routes/ProtectedRoute'

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
            <Route path="/tables" component={Tables} />
            <ProtectedRoute path="/admin" component={Admin} />
            <ProtectedRoute path="/admintablesdetail/:tableNum" component={AdminTablesDetail} />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
