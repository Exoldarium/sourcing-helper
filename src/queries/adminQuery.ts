import { toExistingRoleEntry } from '../../utils/parseRoleData';
import { toExistingUserEntry } from '../../utils/parseUserData';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { Role, UpdateUserAdmin, User, UserWithRoles } from '../types/types';
import { getAllRoles } from './roleTotalQuery';

const getUsersAdmin = async (): Promise<UserWithRoles[]> => {
  try {
    const users = await db.selectFrom('users')
      .selectAll('users')
      .execute();

    const roles = await getAllRoles();

    const parsedUser = users.map(toExistingUserEntry);
    const parsedRole = roles.map(toExistingRoleEntry);

    const usersWithRoles = parsedUser.map(user => {
      const role: Role[] = [];

      const userToAddRoleTo: UserWithRoles = {
        ...user,
        role
      };

      for (const roleKey of parsedRole) {
        if (user.user_id === roleKey.user_id) {
          userToAddRoleTo.role.push(roleKey);
        }
      }

      return userToAddRoleTo;
    });

    return usersWithRoles;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getUserAdmin = async (id: string): Promise<UserWithRoles> => {
  try {
    const user = await db.selectFrom('users')
      .where('user_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    const roles = await getAllRoles();

    const parsedUser = toExistingUserEntry(user);
    const parsedRole = roles.map(toExistingRoleEntry);

    const role: Role[] = [];

    const userToAddRoleTo: UserWithRoles = {
      ...parsedUser,
      role
    };

    for (const roleKey of parsedRole) {
      if (parsedUser.user_id === roleKey.user_id) {
        userToAddRoleTo.role.push(roleKey);
      }
    }

    return userToAddRoleTo;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const updateUserAdmin = async (user: UpdateUserAdmin, id: string): Promise<User> => {
  const { name, email, disabled, admin } = user;

  try {
    const user = await db.updateTable('users')
      .set({
        name,
        email,
        admin,
        disabled
      })
      .where('user_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return toExistingUserEntry(user);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const deleteUser = async (id: string) => {
  try {
    return await db.deleteFrom('users')
      .where('user_id', '=', id)
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getUsersAdmin,
  getUserAdmin,
  updateUserAdmin,
  deleteUser
};