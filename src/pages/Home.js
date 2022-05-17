import {Box, Button, Container, Grid, Typography, List, ListItem, ListItemText} from '@mui/material'
import {NavLink} from 'react-router-dom'
import React from 'react'

export default function Home() {

  function renderIntro(){
    return(
      <Grid container sx={{pt: 5}}>
          <Grid item xs={12} lg={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
           <Box sx={{
             display: 'flex',
             flexDirection: 'column',
             width: {xs: '100%', lg: '50%'},
             gap: 2
           }}>
            <Typography variant='h1'
              sx={{
                fontWeight: '700',
                width: '50%',
                lineHeight: 1.05,
                fontSize: {xs: '4rem', lg: '7rem'}
              }}>
                A <span style={{color: '#F58840'}}>Smarter</span> Restaurant
              </Typography>
              <Typography sx={{width: {xs: '100%', lg: '115%'}}}>
                Make your restaurants smarter with next level technology. Efficient management, excellent customer experience. <br /> You will love it.
              </Typography>
              <Box>
                <Button variant='contained' 
                sx={{mr: 2, 
                  backgroundColor: 'warning.dark',
                  '&:hover': {backgroundColor: 'warning.main'}
                  }}>
                  Learn More
                </Button>
                <NavLink to='/tables'>
                  <Button variant='outlined'>
                    Go to tables
                  </Button>
                </NavLink>
              </Box>
           </Box>
          </Grid>

          <Grid item xs={12} lg={6} sx={{mt: {xs: 4, lg: 0}}}>
            <img src={require('../images/main.jpg')} alt="" 
            style={{
              width: '100%',
              borderRadius: '8px',
              opacity: 0.8
            }}/>
          </Grid>

        </Grid>
    )
  }

  function renderListTexts(){
    const listTexts = ['A panel to display and handle recieved orders', 'Add, delete & edit menu', 'Digital table system with QR code', 'Enhanced restaurant management']
    return(
      <List>
        {listTexts.map(text =>
          <ListItem>
            <ListItemText
            primary={'- ' + text}
            />
         </ListItem> )}
      </List>

    )
  }

  function renderMain(){
    return(
      <Grid container sx={{mt: {xs: 3, lg: '15rem'}}}>
        <Grid item xs={12} lg={6} sx={{display: {xs: 'none', lg: 'block'}}}>
          <img src={require('../images/QRCode.jpg')} alt="" 
          style={{
            width: '70%',
            borderRadius: '8px'
          }}/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='h4' sx={{fontWeight: '700'}}>
            What the app offers
          </Typography>
          {renderListTexts()}
        </Grid>
      </Grid>
    )
  }
  
  return (
    <Box sx={{background: '#f2f2f2', minHeight: '150vh'}}>
      <Container maxWidth='xl'>
        {renderIntro()}
        {renderMain()}
      </Container>
    </Box>
  )
}
