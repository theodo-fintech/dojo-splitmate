import { FC, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Expense } from '../../types';
import { ExpenseCard } from './ExpenseCard';
import '../effects/animations.css';

const ListContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '300px',
  gap: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.error.main,
  '& svg': {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
}));

const EmptyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  '& svg': {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
}));

interface ExpensesListProps {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

export const ExpensesList: FC<ExpensesListProps> = ({ expenses, loading, error }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          } else {
            entry.target.classList.remove('fade-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const cards = document.querySelectorAll('.expense-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [expenses]);

  if (loading) return (
    <LoadingContainer>
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body1">
        Loading expenses...
      </Typography>
    </LoadingContainer>
  );

  if (error) return (
    <ErrorContainer>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <Typography variant="h6" gutterBottom>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {error}
      </Typography>
    </ErrorContainer>
  );

  if (expenses.length === 0) return (
    <EmptyContainer>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-2-2H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
      <Typography variant="h6" gutterBottom>
        No expenses yet
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Add your first expense to get started
      </Typography>
    </EmptyContainer>
  );

  return (
    <ListContainer ref={listRef}>
      {expenses.map((expense) => (
        <Box
          key={expense.id}
          className="expense-card"
          sx={{
            mb: 2,
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            '&.fade-in': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          }}
        >
          <ExpenseCard expense={expense} />
        </Box>
      ))}
    </ListContainer>
  );
};
