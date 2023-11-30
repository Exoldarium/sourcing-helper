import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

// DATABASE SCHEMA
export interface SourcingHelperDatabase {
  users: UserTable;
  session: SessionTable;
}

// USER SCHEMA
export interface UserTable {
  user_id: string;
  email: string;
  name: string;
  password_hash: string;
  admin: boolean;
  disabled: boolean;
  created_on: string | number | Date;
}

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserAdmin = Omit<UserTable, 'user_id' | 'password_hash' | 'created_on'>;
export type UpdateUserRegular = Pick<UserTable, 'email' | 'name'>;

export type UserLogin = Omit<CreateNewUser, 'name'>;

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

// SESSION SCHEMA
export interface SessionTable {
  sid: Generated<string>;
  sess: Generated<JsonWebKey>;
  expire: Generated<number>;
}

export type Session = Selectable<SessionTable>;

// ROLE SCHEMA
export interface RoleTotalTable {
  role_id: string;
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

export type CreateNewRole = Pick<RoleTotalTable, 'name'>;

export type Role = Selectable<RoleTotalTable>;
export type NewRole = Insertable<RoleTotalTable>;
export type UpdateRole = Updateable<RoleTotalTable>;

