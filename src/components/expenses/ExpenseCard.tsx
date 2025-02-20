import { FC, memo } from 'react';
import { Card, CardContent, Typography, Avatar, AvatarGroup, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Expense } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { formatDate } from '../../utils/dates';
import { DateFormats } from '../../constants/messages';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-4px)',
    '&::after': {
      opacity: 1,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 24px rgba(0, 191, 165, 0.15)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: -1,
  },
}));

const ExpenseHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  position: 'relative',
}));

const ExpenseAmount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const ExpenseDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
}));

const ParticipantsSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

interface ExpenseCardProps {
  expense: Expense;
}

export const ExpenseCard: FC<ExpenseCardProps> = memo(({ expense }) => {
  const { name, amount, expenseDate, participants } = expense;
  const paidParticipants = participants.filter(p => p.paid).length;

  return (
    <StyledCard>
      <CardContent>
        <ExpenseHeader>
          <div>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 500,
                mb: 0.5,
                color: 'text.primary',
              }}
            >
              {name}
            </Typography>
            <ExpenseDate>
              <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
              </svg>
              {formatDate(expenseDate, DateFormats.EXPENSE_DATE)}
            </ExpenseDate>
          </div>
          <ExpenseAmount variant="h5">
            {formatCurrency(amount)}
          </ExpenseAmount>
        </ExpenseHeader>

        <ParticipantsSection>
          <AvatarGroup 
            max={4} 
            sx={{ 
              '& .MuiAvatar-root': { 
                width: 28, 
                height: 28,
                fontSize: '0.875rem',
                border: '2px solid',
                borderColor: 'background.paper',
              } 
            }}
          >
            {participants.map((participant) => (
              <Avatar
                key={participant.user.email}
                sx={{
                  background: participant.paid 
                    ? 'linear-gradient(45deg, #00BFA5 30%, #00E5BF 90%)'
                    : 'linear-gradient(45deg, #9E9E9E 30%, #BDBDBD 90%)',
                }}
              >
                {participant.user.email[0].toUpperCase()}
              </Avatar>
            ))}
          </AvatarGroup>
          <Chip
            label={`${paidParticipants}/${participants.length} payé`}
            color={paidParticipants === participants.length ? "primary" : "default"}
            size="small"
            sx={{
              height: '24px',
              fontSize: '0.75rem',
              fontWeight: 500,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        </ParticipantsSection>
      </CardContent>
    </StyledCard>
  );
});

ExpenseCard.displayName = 'ExpenseCard';
