import { FC } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 600,
  letterSpacing: '-0.5px',
}));

interface AppHeaderProps {
  onLogout: () => void;
  userEmail?: string;
}

export const AppHeader: FC<AppHeaderProps> = ({ onLogout, userEmail }) => {
  const handleLogout = async () => {
    try {
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 }, gap: 2 }}>
          <Logo variant="h5">
            SplitMate
          </Logo>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {userEmail && (
            <>
              <Typography sx={{ color: 'text.secondary' }}>
                {userEmail}
              </Typography>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                Déconnexion
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
