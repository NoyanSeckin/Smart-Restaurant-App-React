import {Box, Button, Container, Grid, Typography, List, ListItem, ListItemText} from '@mui/material'

import {React, useEffect, useState} from 'react'

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
             width: '50%',
             gap: 2
           }}>
            <Typography variant='h1'
              sx={{
                fontWeight: '700',
                width: '50%',
                lineHeight: 1.05,
              }}>
                A Smarter Restaurant
              </Typography>
              <Typography sx={{width: '115%'}}>
                Make your restaurants smarter with next level technology. Efficient management, excellent customer experience. <br /> You will love it.
              </Typography>
              <Box>
                <Button variant='contained' sx={{mr: 2}}>
                  Learn More
                </Button>
                <Button>
                  Go to tables
                </Button>
              </Box>
           </Box>
          </Grid>

          <Grid item xs={12} lg={6}>
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
    const listTexts = ['A panel to display and handle recieved orders', 'Customiziable QR menu', 'Digital table system with QR code', 'Interactive loyalty program', 'Enhanced communication among staff', 'Revenue Panel']
    return(
      <List>
        {listTexts.map(text =>
          <ListItem>
            <ListItemText
            primary={text}
            />
         </ListItem> )}
      </List>

    )
  }

  function renderMain(){
    return(
      <Grid container sx={{mt: '15rem'}}>
        <Grid item xs={12} lg={6}>
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
    <Box sx={{background: 'orange', minHeight: '150vh'}}>
      <Container maxWidth='xl'>
        {renderIntro()}
        {renderMain()}
      </Container>


    </Box>
  )
}
