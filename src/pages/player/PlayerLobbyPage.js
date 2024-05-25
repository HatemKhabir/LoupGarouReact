import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Stack, Container, Button } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
// components
import { InitialStepper, VoteForCheif, AssignedRole, PlayersLobby } from '../../components';
import Iconify from '../../components/iconify';
import GameContext from '../../contexts/GameContext';
// ----------------------------------------------------------------------

export default function PlayerLobbyPage() {
  const { playerDetails, updatePlayerDetails } = useContext(GameContext);
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1= Players joining
  const steps = ['Join  a game', 'Players joining...', 'Assigning roles', 'Vote for the leader'];
  const { gameId, playerId } = useParams();

  useEffect(() => {
    console.log('context player details', playerDetails);
  }, [playerDetails]);

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const nextStep = () => {
    if (currentStep === 3) {
      console.log('Joined the game');
      navigate('/game');
    }
    console.log("next step")
    setCurrentStep(currentStep + 1);
  };

  const handleSeeMyCard = () => {
    const url = `/${gameId}/role/${playerId}`;
    navigate(url);
  };
  return (
    <>
      <Helmet>
        <title> Join a game </title>
      </Helmet>

      <Container sx={{ paddingTop: 5 }} maxWidth="xl">
        <Stack direction={{ xs: 'row', sm: 'row' }} alignItems="stretch" justifyContent="center" mb={2}>
          {isDesktop && (
            <>
              <InitialStepper currentStep={currentStep} steps={steps} />
            </>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ width: '70%', height: 66, mb: 3 }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Next
          </Button>
        </Stack>

        <PlayersLobby playerName={playerDetails.name} gameId={gameId} seeMyCard={handleSeeMyCard}/>

      </Container>
    </>
  );
}