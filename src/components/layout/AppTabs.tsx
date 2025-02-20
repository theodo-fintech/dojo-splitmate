import { FC } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: '48px',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    height: '3px',
    borderRadius: '3px 3px 0 0',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: '48px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

interface AppTabsProps {
  currentTab: number;
  onTabChange: (newValue: number) => void;
}

export const AppTabs: FC<AppTabsProps> = ({ currentTab, onTabChange }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTabs
        value={currentTab}
        onChange={handleChange}
        centered
      >
        <StyledTab
          icon={<ReceiptLongIcon />}
          iconPosition="start"
          label="Dépenses"
        />
        <StyledTab
          icon={<AccountBalanceIcon />}
          iconPosition="start"
          label="Équilibres"
        />
      </StyledTabs>
    </Box>
  );
};
