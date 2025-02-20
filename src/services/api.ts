import { ExpenseDTO, CreateExpenseData, CreateExpenseDTO } from '../types/expense';
import { User } from '../types/user';
import { ApiError, ErrorCodes } from '../types/error';
import { ErrorMessages } from '../constants/messages';
import { AuthResponse } from '../types/api';

import { config } from '../config/env';

const API_BASE_AUTH_URL = config.apiAuthUrl;
const API_BASE_URL = config.apiUrl;

const getAuthHeader = (): { Authorization: string } => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new ApiError('No authentication token found', ErrorCodes.FETCH_EXPENSES);
  }
  return { Authorization: `Bearer ${token}` };
};

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async <T>(response: Response, errorCode: string = ErrorCodes.FETCH_EXPENSES): Promise<T> => {
  if (!response.ok) {
    let errorMessage: string;
    try {
      const error = await response.json();
      errorMessage = error.message || ErrorMessages.FETCH_EXPENSES;
    } catch {
      // If we can't parse the error JSON, use status text or default message
      errorMessage = response.statusText || ErrorMessages.FETCH_EXPENSES;
    }
    throw new ApiError(errorMessage, errorCode, response.status);
  }

  try {
    return await response.json();
  } catch {
    // Handle empty responses (e.g., for DELETE requests)
    if (response.status === 204) {
      return {} as T;
    }
    throw new ApiError('Invalid JSON response', errorCode);
  }
};

export const api = {
  // Auth
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_AUTH_URL}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(response);
  },

  // (Deprecated) Users
  getUsersOld: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_AUTH_URL}/auth/users/v1`, {
      headers: getAuthHeader(),
    });
    return handleResponse<User[]>(response, ErrorCodes.FETCH_USERS);
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_AUTH_URL}/auth/users`, {
      headers: getAuthHeader(),
    });
    return handleResponse<User[]>(response, ErrorCodes.FETCH_USERS);
  },

  // Expenses
  getExpenses: async (): Promise<ExpenseDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      headers: getAuthHeader(),
    });
    return handleResponse<ExpenseDTO[]>(response, ErrorCodes.FETCH_EXPENSES);
  },

  createExpense: async (data: CreateExpenseData): Promise<void> => {
    const dto: CreateExpenseDTO = {
      ...data,
      expenseDate: data.expenseDate?.toISOString() ?? null
    };

    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { ...defaultHeaders, ...getAuthHeader() },
      body: JSON.stringify(dto),
    });
    
    await handleResponse<void>(response, ErrorCodes.CREATE_EXPENSE);
  },
};
