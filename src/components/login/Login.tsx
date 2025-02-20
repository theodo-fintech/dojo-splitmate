import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Container, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { api } from '../../services/api';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LoginIcon from '@mui/icons-material/Login';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: `linear-gradient(45deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, rgba(0, 191, 165, 0.05))`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 600,
  letterSpacing: '-0.5px',
}));

interface LoginProps {
  onLogin: (email: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { user, access_token } = await api.login(email, password);
      localStorage.setItem('access_token', access_token);
      onLogin(user.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Container maxWidth="sm">
        <LoginCard elevation={4}>
          <LogoContainer>
            <AccountBalanceWalletIcon 
              sx={{ 
                fontSize: 40,
                color: 'primary.main',
              }} 
            />
            <Logo variant="h4">
              SplitMate
            </Logo>
          </LogoContainer>

          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Bienvenue ! Veuillez vous connecter pour continuer.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              disabled={isLoading}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
              sx={{
                height: 48,
                background: 'linear-gradient(45deg, #00BFA5 30%, #00E5BF 90%)',
                boxShadow: '0 3px 8px rgba(0, 191, 165, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 191, 165, 0.4)',
                },
              }}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
};
