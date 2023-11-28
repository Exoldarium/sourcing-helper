import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

export interface SourcingHelperDatabase {
  users: UserTable;
}

export interface UserTable {
  user_id: Generated<string>;
  email: string;
  name: string;
  admin: boolean;
  disabled: boolean;
  created_on: string | number | Date;
}

export type CreateNewUser = Omit<UserTable, 'user_id' | 'admin' | 'disabled' | 'created_on'>

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
