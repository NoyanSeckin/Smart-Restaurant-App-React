import {React, useState} from 'react'

import {Box, Container, Paper, Typography} from '@mui/material'

import AdminTables from '../components/AdminTables'
import AddMenu from '../components/AddMenu/AddMenu'
export default function Admin() {

  const [activePage, setActivePage] = useState('Restaurant Tables');
  
  function renderNavs(){
    const navs = ['Restaurant Tables', 'Add Menu'];
    return navs.map(nav => 
      <Typography key={nav} variant='h6' className={activePage === nav && 'active-nav'}
      onClick={()=> setActivePage(nav)}
      sx={{mb: 2,'&:hover': {cursor: 'pointer'}}}>
        {nav}
      </Typography>
      )
  }

  function renderPage(){
    if(activePage === 'Restaurant Tables'){
      return <AdminTables/>
    } else if(activePage === 'Add Menu'){
      return <AddMenu/>
    }
  }
 
  return (
    <Box sx={{background: '#f2f2f2', minHeight: '120vh'}}>
      <Container maxWidth='xl'
      sx={{
        borderRadius: '8px', 
        pt: 3, 
        }}>
        <Paper sx={{px: 4, pt: 3, pb: 5, minHeight: '80vh', background: '#fff', borderRadius: '8px'}}>
        <Box sx={{display: 'flex', gap: 5}}>
          {renderNavs()}
        </Box>
        {renderPage()}
        </Paper>
      </Container>
    </Box>

  )
}
