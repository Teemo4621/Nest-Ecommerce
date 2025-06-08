import { UserRole } from 'src/users/enum/role.enum';

export interface TokenPayload {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}
