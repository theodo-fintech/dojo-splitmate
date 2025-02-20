export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const ErrorCodes = {
  FETCH_EXPENSES: 'FETCH_EXPENSES_ERROR',
  CREATE_EXPENSE: 'CREATE_EXPENSE_ERROR',
  FETCH_USERS: 'FETCH_USERS_ERROR',
  FETCH_BALANCES: 'FETCH_BALANCES_ERROR',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
