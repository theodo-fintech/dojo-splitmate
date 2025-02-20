import { Participant } from "./user";

export interface ExpenseDTO {
  id: string;
  amount: number;
  name: string;
  participants: Participant[];
  expenseDate?: string;
  createdDate: string;
}

export interface Expense {
  id: string;
  amount: number;
  name: string;
  participants: Participant[];
  expenseDate?: Date;
  createdDate: Date;
}

export interface ParticipantDTO {
  userId: string;
  paid: boolean;
}

export interface CreateExpenseDTO {
  amount: number;
  name: string;
  expenseDate: string | null;
  participants: ParticipantDTO[];
}

export interface CreateExpenseData {
  amount: number;
  name: string;
  expenseDate: Date | null;
  participants: ParticipantDTO[];
}
