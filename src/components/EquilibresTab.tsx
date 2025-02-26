import { Box, Typography, Container, Paper, Alert, Grid, Card, CardContent } from '@mui/material';
import { useUsers } from '../hooks/useUsers';
import { useExpenses } from '../hooks/useExpenses';
import { useMemo } from 'react';
import Particles from './effects/Particles';
import './effects/animations.css';

const formatEmail = (email: string) => {
  const [localPart] = email.split('@');
  if (localPart.includes('.')) {
    return localPart.split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
  return localPart;
};

export const EquilibresTab = () => {
  const { users, loading: usersLoading, error: usersError } = useUsers();
  const {
    expenses,
    loading: expensesLoading,
    error: expensesError,
  } = useExpenses();

  const balances = useMemo(() => {
    // Initialize balances map with 0 for each user
    const balancesMap = new Map(users.map((user) => [user.email, 0]));

    // Iterate through expenses
    expenses.forEach((expense) => {
      // Calculate amount per participant
      const amountToPay = expense.amount / expense.participants.length;

      // Iterate through participants
      expense.participants.forEach((participant) => {
        const userEmail = participant.user.email;

        if (participant.paid) {
          // If participant paid, add their overpayment
          balancesMap.set(
            userEmail,
            (balancesMap.get(userEmail) || 0) + (expense.amount - amountToPay)
          );
        } else {
          // If participant didn't pay, subtract their share
          balancesMap.set(
            userEmail,
            (balancesMap.get(userEmail) || 0) - amountToPay
          );
        }
      });
    });

    // Convert map to array of balance objects
    return Array.from(balancesMap, ([email, balance]) => ({ email, balance }));
  }, [users, expenses]);

  if (usersLoading || expensesLoading)
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography>Chargement...</Typography>
      </Container>
    );

  if (usersError || expensesError)
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert severity="error">{usersError || expensesError}</Alert>
      </Container>
    );

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ 
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <Particles
          particleColors={['#00BFA5', '#00E5BF']}
          particleCount={250}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={200}
          sizeRandomness={0.5}
          moveParticlesOnHover={false}
          particleHoverFactor={0.5}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={25}
        />
      </div>
      <Container maxWidth="lg" sx={{ py: 3, position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3 },
            mb: 3,
            background: 'linear-gradient(to right, rgba(63, 81, 181, 0.1), rgba(100, 181, 246, 0.1))',
            borderRadius: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Grid container spacing={2}>
            {balances.map(({ email, balance }) => (
              <Grid item xs={12} sm={6} md={4} key={email}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {formatEmail(email)}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: balance > 0 ? '#00BFA5' : balance < 0 ? 'red' : 'inherit',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }}
                    >
                      {balance.toFixed(2)} €
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
