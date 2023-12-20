// USER
export interface User {
  user_id: string;
  email: string;
  name: string;
  password_hash: string;
  admin: boolean;
  disabled: boolean;
  created_on: Date | string | number;
}

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
}

export type AdminUser = Omit<User, 'password_hash'>;
export type RegularUser = Pick<User, 'user_id' | 'email' | 'name'>

export type UpdateUserAdmin = Omit<User, 'user_id' | 'password_hash' | 'created_on'>;
export type UpdateUserRegular = Pick<User, 'email' | 'name'>;
export type UserRegular = Pick<User, 'email' | 'user_id' | 'name'>;

export type UserLogin = Omit<CreateNewUser, 'name'>;

// BLACKLIST
export interface Blacklist {
  user_id: string;
  email: string;
}

// ROLES
export interface RoleTotal {
  role_id: string;
  user_id: string;
  role_name: string;
  created_on: Date | string | number;
  permission: string[];
  content: string;
  link: string;
}

export type NewRoleEntry = Pick<RoleTotal, 'role_name' | 'permission' | 'link' | 'content'>;

export interface RoleLog {
  id: number;
  log_id: string;
  user_id: string;
  role_id: string;
  created_on: Date | string | number;
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

export interface Role extends RoleTotal {
  role_data: NewRoleLogEntry[]
}

export type NewRoleLogEntry = Omit<RoleLog, 'id' | 'log_id' | 'user_id' | 'role_id' | 'created_on'>;