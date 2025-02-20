import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpensesTab } from './ExpensesTab';
import { EquilibresTab } from './EquilibresTab';
import { AppHeader } from './layout/AppHeader';
import { AppTabs } from './layout/AppTabs';

interface MainProps {
  userEmail: string;
  onLogout: () => void;
}

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

type TabType = 'expenses' | 'equilibres';

export const Main = ({ userEmail, onLogout }: MainProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('expenses');

  return (
    <MainContainer>
      <AppHeader userEmail={userEmail} onLogout={onLogout} />
      <AppTabs
        currentTab={activeTab === 'expenses' ? 0 : 1}
        onTabChange={(newValue) => setActiveTab(newValue === 0 ? 'expenses' : 'equilibres')}
      />
      <ContentContainer>
        <Container maxWidth="md">
          {activeTab === 'expenses' ? <ExpensesTab /> : <EquilibresTab />}
        </Container>
      </ContentContainer>
    </MainContainer>
  );
};
