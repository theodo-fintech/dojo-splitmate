export const ErrorMessages = {
  FETCH_EXPENSES: 'Échec du chargement des dépenses',
  CREATE_EXPENSE: 'Échec de la création de la dépense',
  FETCH_USERS: 'Échec du chargement des utilisateurs',
  FETCH_BALANCES: 'Échec du chargement des équilibres',
  REQUIRED_FIELDS: 'Veuillez remplir tous les champs obligatoires',
} as const;

export const DateFormats = {
  EXPENSE_DATE: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
} as const;
