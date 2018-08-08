export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email: string;
  authToken?: string;
  roles: string;
}
