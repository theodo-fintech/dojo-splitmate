import { http, HttpResponse } from "msw";
import { User } from "../types/user";
import { Expense } from "../types/expense";

const mockUsers: User[] = [
  { id: "id", email: "thomas@example.com" },
  { id: "id", email: "marie@example.com" },
  { id: "id", email: "pierre@example.com" },
  { id: "id", email: "sophie@example.com" },
  { id: "id", email: "lucas@example.com" },
];

let mockExpenses: Expense[] = [
  {
    id: "1",
    amount: 75.5,
    name: "Dîner d'équipe au restaurant italien",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "thomas@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "marie@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "pierre@example.com" },
        paid: false,
      },
    ],
    expenseDate: new Date("2025-02-04"),
    createdDate: new Date("2025-02-04"),
  },
  {
    id: "2",
    amount: 120,
    name: "Billets de concert",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "sophie@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "lucas@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "marie@example.com" },
        paid: false,
      },
    ],
    expenseDate: new Date("2025-02-03"),
    createdDate: new Date("2025-02-03"),
  },
  {
    id: "3",
    amount: 45.99,
    name: "Courses pour la soirée cinéma",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "pierre@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "thomas@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "sophie@example.com" },
        paid: false,
      },
    ],
    expenseDate: new Date("2025-02-02"),
    createdDate: new Date("2025-02-02"),
  },
  {
    id: "4",
    amount: 200,
    name: "Essence pour le weekend",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "lucas@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "marie@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "sophie@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "thomas@example.com" },
        paid: false,
      },
    ],
    createdDate: new Date("2025-02-01"),
  },
  {
    id: "5",
    amount: 89.99,
    name: "Soirée jeux de société",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "marie@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "pierre@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "lucas@example.com" },
        paid: false,
      },
    ],
    expenseDate: new Date("2025-01-30"),
    createdDate: new Date("2025-01-30"),
  },
  {
    id: "6",
    amount: 150,
    name: "Cadeau de groupe pour Sarah",
    participants: [
      {
        userId: "id",
        user: { id: "id", email: "thomas@example.com" },
        paid: true,
      },
      {
        userId: "id",
        user: { id: "id", email: "pierre@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "lucas@example.com" },
        paid: false,
      },
      {
        userId: "id",
        user: { id: "id", email: "marie@example.com" },
        paid: false,
      },
    ],
    expenseDate: new Date("2025-01-28"),
    createdDate: new Date("2025-01-28"),
  },
];

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const data = (await request.json()) as { email: string; password: string };
    const user = mockUsers.find((u) => u.email === data.email);

    if (!user || data.password !== "password123") {
      return new HttpResponse(null, { status: 403 });
    }

    return HttpResponse.json({
      user: { email: data.email },
      token: "mock-jwt-token",
    });
  }),

  http.get("/api/users", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new HttpResponse(null, { status: 403 });
    }
    return HttpResponse.json(mockUsers);
  }),

  // Expenses endpoints
  http.get("/api/expenses", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new HttpResponse(null, { status: 403 });
    }
    return HttpResponse.json(mockExpenses);
  }),

  http.post("/api/expenses", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new HttpResponse(null, { status: 403 });
    }
    const expense = (await request.json()) as Expense;
    const newExpense: Expense = {
      id: String(mockExpenses.length + 1),
      amount: expense.amount,
      name: expense.name,
      participants: expense.participants,
      expenseDate: expense.expenseDate,
      createdDate: new Date(),
    };
    mockExpenses = [newExpense, ...mockExpenses];
    return HttpResponse.json(newExpense, { status: 201 });
  }),
];
