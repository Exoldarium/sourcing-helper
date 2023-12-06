import express from 'express';
import { createRole, getAllRoles, getSpecificRole } from '../queries/roleTotalQuery';
import { toNewRoleEntry } from '../../utils/parseRoleData';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../utils/helpers';
import { CreateNewRole } from '../types/types';

// TODO: join user with the role

const rolesTotalRouter = express.Router();

rolesTotalRouter.get('/', async (_req, res, next) => {
  try {
    const allRoles = await getAllRoles();

    return res.status(200).send(allRoles);
  } catch (err) {
    return next(err);
  }
});

rolesTotalRouter.get('/:id', async (req, res, next) => {
  try {
    const role = await getSpecificRole(req.params.id);

    return res.status(200).send(role);
  } catch (err) {
    return next(err);
  }
});

rolesTotalRouter.post('/', async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const parsedNewRole = toNewRoleEntry(req.body);

    if (!currentUser) return res.status(400).send('Must be logged in');

    const newRole: CreateNewRole = {
      ...parsedNewRole,
      user_id: currentUser?.id,
      role_id: uuidv4(),
      created_on: getDate()
    };

    const roleAdded = await createRole(newRole);

    return res.status(200).send(roleAdded);
  } catch (err) {
    return next(err);
  }
});

export { rolesTotalRouter };