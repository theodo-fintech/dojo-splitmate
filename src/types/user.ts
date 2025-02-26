export interface User {
  id: string;
  email: string;
  balance?: number;
}

export interface Participant {
  user: User;
  userId: string;
  paid: boolean;
}
