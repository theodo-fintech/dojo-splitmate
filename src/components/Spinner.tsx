import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress
        sx={{
          color: 'primary.main',
          animationDuration: '550ms',
        }}
        size={60}
        thickness={4}
      />
    </Box>
  );
};
