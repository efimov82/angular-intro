export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  authToken?: string;
  roles: string;
}
