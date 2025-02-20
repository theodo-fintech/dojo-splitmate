import { FC, useState, useEffect, useCallback } from "react";
import { api } from "../../services/api";
import {
  Modal,
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUsers } from "../../hooks";
import type { CreateExpenseData } from "../../types/expense";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 500,
  maxHeight: "90vh",
  overflow: "auto",
  borderRadius: theme.shape.borderRadius * 2,
}));

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onExpenseAdded: () => void;
}

type FormState = {
  name: string;
  amount: string;
  expenseDate: Date | null;
  selectedParticipants: string[];
  paidBy: string;
};

export const ExpenseModal: FC<ExpenseModalProps> = ({
  open,
  onClose,
  onExpenseAdded,
}) => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    amount: "",
    expenseDate: new Date(),
    selectedParticipants: [],
    paidBy: "",
  });
  const { users, error: usersError } = useUsers();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = useCallback(() => {
    setFormState({
      name: "",
      amount: "",
      expenseDate: new Date(),
      selectedParticipants: [],
      paidBy: "",
    });
    setError("");
  }, []);

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open, resetForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { amount, name, selectedParticipants, paidBy, expenseDate } =
        formState;

      if (!amount || !name || !selectedParticipants.length || !paidBy) {
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }

      setLoading(true);
      setError("");

      try {
        console.log(selectedParticipants);
        console.log("users", users);
        const expenseData: CreateExpenseData = {
          amount: parseFloat(amount),
          name,
          expenseDate,
          participants: [...selectedParticipants].map((email) => ({
            userId: users.find((user) => user.email === email)?.id ?? "",
            paid: email === paidBy,
          })),
        };

        await api.createExpense(expenseData);
        onExpenseAdded();
        onClose();
      } catch {
        setError("Échec de la création de la dépense");
      } finally {
        setLoading(false);
      }
    },
    [formState, onExpenseAdded, onClose]
  );

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="expense-modal-title"
    >
      <ModalContent>
        <DialogTitle id="expense-modal-title">Nouvelle dépense</DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {(error || usersError) && (
              <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
                {error || usersError}
              </Alert>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? "Création..." : "Ajouter"}
          </Button>
        </DialogActions>
      </ModalContent>
    </StyledModal>
  );
};
