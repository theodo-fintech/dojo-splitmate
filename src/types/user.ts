export interface User {
  id: string;
  email: string;
}

export interface Participant {
  user: User;
  userId: string;
  paid: boolean;
}
