import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { Stack, Grid, Container, Typography, Button, TextField } from '@mui/material';
// components
import { PlayersJoining, InitialStepper } from '../sections/new';
import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

export default function JoinGamePage() {
  const [joined, setJoined] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Join  a game', 'Players joining...', 'Vote for the cheif'];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('player joined');
    setJoined(true);
    setCurrentStep(1)
  };
  return (
    <>
      <Helmet>
        <title> Join a game </title>
      </Helmet>

      <Container maxWidth="xl">
        <InitialStepper currentStep={currentStep} steps={steps} />
        {!joined && (
          <>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, enter your name and the game ID
            </Typography>
            <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ height: 56, marginTop: 2 }}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Join the game
                </Button>
            </Stack>
           
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField margin="normal" required id="outlined-required" label="Name" fullWidth />
                <TextField margin="normal" required id="outlined-required" label="Game ID" fullWidth />
              </Grid>
            </Grid>
          </>
        )}
        {joined && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                The game will start when everyone join, be ready!
              </Typography>
              <Button variant="contained" sx={{ width: 166, height: 66 }}>
                I am ready
              </Button>
            </Stack>
            <PlayersJoining />
          </>
        )}
      </Container>
    </>
  );
}
