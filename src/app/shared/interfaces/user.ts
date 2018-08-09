export interface User {
  id: number;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email: string;
  authToken?: string;
  roles: string;
}
