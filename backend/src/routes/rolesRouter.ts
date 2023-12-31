import express from 'express';
import { addPermission, createRole, deleteRole, getAllRoles, getSpecificRole, updateRole } from '../queries/roleTotalQuery';
import { toNewRoleEntry, toNewRolePermissionEntry, toUpdateRoleEntry } from '../../utils/parseRoleData';
import { v4 as uuidv4 } from 'uuid';
import { CreateNewRole } from '../types/types';

const rolesRouter = express.Router();

rolesRouter.get('/', async (_req, res, next) => {
  try {
    const allRoles = await getAllRoles();

    return res.status(200).send(allRoles);
  } catch (err) {
    return next(err);
  }
});

rolesRouter.get('/:id', async (req, res, next) => {
  try {
    const role = await getSpecificRole(req.params.id);

    return res.status(200).send(role);
  } catch (err) {
    return next(err);
  }
});

rolesRouter.post('/', async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const parsedNewRole = toNewRoleEntry(req.body);

    if (!currentUser) return res.status(400).send('Must be logged in');

    const newRole: CreateNewRole = {
      ...parsedNewRole,
      user_id: currentUser.user_id,
      role_id: uuidv4(),
      permission: [...parsedNewRole.permission, currentUser.user_id],
      content: '',
      link: '',
      initial_msg: ''
    };

    const roleAdded = await createRole(newRole);

    return res.status(200).send(roleAdded);
  } catch (err) {
    return next(err);
  }
});

rolesRouter.put('/:id', async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const findRole = await getSpecificRole(req.params.id);

    if (!currentUser) return res.status(400).send('Must be logged in');

    const checkPermission = findRole.permission.find(id => id === currentUser.user_id);

    if (!checkPermission || !req.session.admin) return res.status(400).send('Permission required');

    const parsedRole = toUpdateRoleEntry(req.body);
    console.log(parsedRole, 'parsed');
    const roleToUpdate = {
      ...parsedRole,
      permission: [...findRole.permission]
    };

    const updatedRole = await updateRole(req.params.id, roleToUpdate);

    return res.status(200).send(updatedRole);
  } catch (err) {
    return next(err);
  }
});

rolesRouter.put('/addPermission/:id', async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const findRole = await getSpecificRole(req.params.id);

    const parsedPermission = toNewRolePermissionEntry(req.body);

    const checkExistingPermissions = findRole.permission.find(id => parsedPermission.includes(id));

    if (checkExistingPermissions) return res.status(400).send('Permission already added');

    if (!currentUser) return res.status(400).send('Must be logged in');

    // only the role creator or admin can add new permissions to the role
    if (!(currentUser.user_id === findRole.user_id || req.session.admin)) return res.status(403).send('Not allowed');

    const newPermissions = findRole.permission.concat(parsedPermission);

    const updatedPermissions = await addPermission(findRole.role_id, newPermissions);

    return res.status(200).send(updatedPermissions);
  } catch (err) {
    return next(err);
  }
});

rolesRouter.delete('/:id', async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const findRole = await getSpecificRole(req.params.id);

    if (!currentUser) return res.status(400).send('Must be logged in');

    // only the role creator or admin can delete the role
    if (!(currentUser.user_id === findRole.user_id || req.session.admin)) return res.status(403).send('Not allowed');

    await deleteRole(findRole.role_id);

    return res.status(200).end();
  } catch (err) {
    return next(err);
  }
});

export { rolesRouter };