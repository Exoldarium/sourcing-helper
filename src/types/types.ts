import {
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

// DATABASE SCHEMA
export interface SourcingHelperDatabase {
  users: UserTable;
  blacklist: BlacklistTable;
  roles_total: RoleTotalTable
}

// USER SCHEMA
export interface UserTable {
  user_id: string;
  email: string;
  name: string;
  password_hash: string;
  admin: boolean;
  disabled: boolean;
  created_on: string;
}

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserWithRoles extends User {
  role: Role[];
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export type UpdateUserAdmin = Omit<UpdateUser, 'user_id' | 'password_hash' | 'created_on'>;
export type UpdateUserRegular = Pick<UpdateUser, 'email' | 'name'>;
export type UserRegular = Pick<User, 'email' | 'user_id' | 'name'>;

export type UserLogin = Omit<CreateNewUser, 'name'>;

// BLACKLIST SCHEMA
export interface BlacklistTable {
  user_id: string;
  email: string;
}

export type Blacklist = Selectable<BlacklistTable>;
export type NewBlacklist = Insertable<BlacklistTable>;
export type UpdateBlacklist = Updateable<BlacklistTable>;

// ROLE SCHEMA
export interface RoleTotalTable {
  role_id: string;
  user_id: string;
  name: string;
  created_on: string;
  permission: string[],
  invitation: number;
  initial_contact: number;
  replied: number;
  job_description: number;
  application_reviewed: number;
  proposed: number;
  accepted: number;
  rejected: number;
  follow_up: number;
}

export interface CreateNewRole {
  name: string;
  permission: string[];
  user_id: string;
  role_id: string;
  created_on: string;
}

export type Role = Selectable<RoleTotalTable>;
export type NewRole = Insertable<RoleTotalTable>;
export type UpdateRole = Updateable<RoleTotalTable>;

export type NewRoleEntry = Pick<NewRole, 'name' | 'permission'>;
