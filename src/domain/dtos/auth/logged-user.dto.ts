import { UserToClientDTO } from '@src/modules/app/user/dtos';

export type LoggedUserDTO = {
  token: string;
  user: UserToClientDTO;
};
