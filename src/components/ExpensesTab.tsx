import { useState } from 'react';
import { Box, Button, Typography, Container, Paper, Alert } from '@mui/material';
import { ExpenseModal } from './expenses/ExpenseModal';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useExpenses } from '../hooks';
import { ExpensesList } from './expenses/ExpensesList';
import Particles from './effects/Particles';

export const ExpensesTab = () => {
  const { expenses, loading, error, refetch } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpenseAdded = () => {
    refetch();
  };

  if (loading) return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography>Chargement...</Typography>
    </Container>
  );

  if (error) return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Alert severity="error">{error}</Alert>
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
        <ExpenseModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onExpenseAdded={handleExpenseAdded}
        />
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3 },
            mb: 3,
            background: 'linear-gradient(to right, rgba(0, 191, 165, 0.1), rgba(0, 229, 191, 0.1))',
            borderRadius: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ReceiptLongIcon 
              sx={{ 
                fontSize: 40,
                color: 'primary.main',
              }} 
            />
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                Dépenses
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Gérez et suivez vos dépenses partagées
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Ajouter une dépense
          </Button>
        </Paper>

        <ExpensesList
          expenses={expenses}
          loading={loading}
          error={error}
        />
      </Container>
    </Box>
  );
};
