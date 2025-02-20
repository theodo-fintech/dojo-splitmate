import {
  Typography,
  Container,
  Paper,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useUsers } from "../hooks/useUsers";
import { useExpenses } from "../hooks/useExpenses";
import { useMemo } from "react";

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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          background:
            "linear-gradient(to right, rgba(63, 81, 181, 0.1), rgba(100, 181, 246, 0.1))",
          borderRadius: 3,
        }}
      >
        <Grid container spacing={2}>
          {balances.map(({ email, balance }) => (
            <Grid item xs={12} sm={6} md={4} key={email}>
              <Card
                sx={{
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 2,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {email}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        balance > 0 ? "green" : balance < 0 ? "red" : "inherit",
                      fontWeight: 600,
                      fontSize: "1.1rem",
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
  );
};
