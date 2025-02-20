import { Expense } from "../types";

export const mockExpenses: Expense[] = [
  {
    id: "1",
    amount: 45.5,
    name: "Restaurant",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "john@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "jane@example.com" },
        paid: false,
      },
    ],
    createdDate: new Date("2024-02-04"),
  },
  {
    id: "2",
    amount: 120.0,
    name: "Groceries",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "john@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "john@example.com" },
        paid: true,
      },
    ],
    createdDate: new Date("2024-02-03"),
  },
];

export const mockBalances = [
  { email: "john@example.com", balance: 82.75 },
  { email: "jane@example.com", balance: -82.75 },
];
