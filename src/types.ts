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
  passwordHash: string;
  admin: boolean;
  disabled: boolean;
  created_on: string | number | Date;
}

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export interface RoleTotalTable {
  role_id: Generated<string>;
  user_id: string;
  name: string;
  date_added: string;
  permission: string[],
  invitation: number;
  initial_contact: number;
  replied: number;
  job_description: number;
  application_review: number;
  proposed: number;
  accepted: number;
  rejected: number;
  follow_up: number;
}

export interface CreateNewRole {
  name: string;
}

export type Role = Selectable<RoleTotalTable>;
export type NewRole = Insertable<RoleTotalTable>;
export type UpdateRole = Updateable<RoleTotalTable>;

