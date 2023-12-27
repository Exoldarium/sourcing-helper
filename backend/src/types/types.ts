import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

// DATABASE SCHEMA
export interface SourcingHelperDatabase {
  users: UserTable;
  blacklist: BlacklistTable;
  roles_total: RoleTotalTable;
  role_log: RoleLogTable;
}

// USER SCHEMA
export interface UserTable {
  user_id: string;
  email: string;
  name: string;
  password_hash: string;
  admin: boolean;
  disabled: boolean;
  created_on: Generated<Date | string | number>;
}

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
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
  role_name: string;
  created_on: Generated<Date | string | number>;
  permission: string[];
  content: string;
  link: string;
  initial_msg: string;
}

export type CreateNewRole = Omit<RoleTotalTable, 'created_on'>;

export type Role = Selectable<RoleTotalTable>;
export type NewRole = Insertable<RoleTotalTable>;
export type UpdateRole = Updateable<RoleTotalTable>;

export type NewRoleEntry = Pick<NewRole, 'role_name' | 'permission'>;
export type UpdateRoleEntry = Pick<UpdateRole, 'role_name' | 'permission' | 'link' | 'content' | 'initial_msg'>;

// ROLE LOG SCHEMA
export interface RoleLogTable {
  id: Generated<number>;
  log_id: string;
  user_id: string;
  role_id: string;
  created_on: Generated<Date | string | number>;
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

export type NewRoleLogEntry = Omit<RoleLog, 'id' | 'log_id' | 'user_id' | 'role_id' | 'created_on'>;

export type RoleLog = Selectable<RoleLogTable>;
export type NewRoleLog = Insertable<RoleLogTable>;
export type UpdateRoleLog = Updateable<RoleLogTable>;
