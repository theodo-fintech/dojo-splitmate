import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorMessages } from "../constants/messages";
import { parseDateSafe } from "../utils/dates";
import { api } from "../services/api";
import { Expense, ExpenseDTO, CreateExpenseData } from "../types/expense";

interface UseExpensesReturn {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createExpense: (data: CreateExpenseData) => Promise<void>;
  clearError: () => void;
}

const EXPENSES_QUERY_KEY = ["expenses"] as const;

const parseExpenseData = (data: ExpenseDTO[]): Expense[] => {
  return data.map((expense) => ({
    ...expense,
    createdDate: parseDateSafe(expense.createdDate) || new Date(),
    expenseDate: parseDateSafe(expense.expenseDate),
  }));
};

export const useExpenses = (): UseExpensesReturn => {
  const queryClient = useQueryClient();

  const {
    data: expenses = [],
    isLoading: isLoadingExpenses,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: async () => {
      const data = await api.getExpenses();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      return parseExpenseData(data as ExpenseDTO[]);
    },
  });

  const { mutateAsync: createExpenseMutation } = useMutation({
    mutationFn: api.createExpense,
    onSuccess: () => {
      // Invalidate and refetch expenses after successful creation
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });

  const createExpense = async (data: CreateExpenseData) => {
    try {
      await createExpenseMutation(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ErrorMessages.CREATE_EXPENSE;
      throw new Error(errorMessage);
    }
  };

  return {
    expenses,
    loading: true,
    error: queryError?.message || null,
    refetch: async () => {
      await refetch();
    },
    createExpense,
    clearError: () => {
      // React Query handles error clearing automatically
    },
  };
};
