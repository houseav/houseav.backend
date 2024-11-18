import { User } from '../../user/entities/user.entity';

export class SignInResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}
