import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { deleteLastLoggedEntry, getAllRoleLogs, getSpecificLogsBasedOnDate, insertRoleLog } from '../queries/roleLogQuery';
import { validateAdmin, validateUser } from '../../utils/middleware';
import { toNewRoleLogEntry } from '../../utils/parseRoleData';
import { getSpecificRole } from '../queries/roleTotalQuery';
import { NewRoleLog } from '../types/types';
import { parseToString } from '../../utils/parsingHelpers';

const roleLogRouter = express.Router();

roleLogRouter.get('/', validateAdmin, async (_req, res, next) => {
  try {
    const roleLog = await getAllRoleLogs();

    return res.status(200).send(roleLog);
  } catch (err) {
    return next(err);
  }
});

roleLogRouter.get('/date', async (req, res, next) => {
  try {
    const dateFrom = new Date(parseToString(req.query.dateFrom)).toISOString();
    const dateTo = new Date(parseToString(req.query.dateTo)).toISOString();

    const roleLogs = await getSpecificLogsBasedOnDate(dateFrom, dateTo);

    return res.status(200).send(roleLogs);
  } catch (err) {
    return next(err);
  }
});

// insert new role_log
roleLogRouter.post('/:id', validateUser, async (req, res, next) => {
  try {
    const roleData = toNewRoleLogEntry(req.body);
    const currentUser = req.session.user;
    const findRole = await getSpecificRole(req.params.id);

    if (!currentUser) return res.status(403).send('Must be logged in');

    const checkPermission = findRole.permission.find(id => id === currentUser.id);

    // only the admin or users with permissions can add logs
    if (!(checkPermission || req.session.admin)) return res.status(403).send('Not allowed');

    const roleToAdd: NewRoleLog = {
      ...roleData,
      log_id: uuidv4(),
      user_id: currentUser.id,
      role_id: req.params.id
    };

    const newRole = await insertRoleLog(roleToAdd);

    return res.status(200).send(newRole);
  } catch (err) {
    return next(err);
  }
});

roleLogRouter.delete('/:id', validateUser, async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const findRole = await getSpecificRole(req.params.id);

    if (!currentUser) return res.status(403).send('Must be logged in');

    const checkPermission = findRole.permission.find(id => id === currentUser.id);

    // only the admin or users with permissions can add logs
    if (!(checkPermission || req.session.admin)) return res.status(403).send('Not allowed');

    await deleteLastLoggedEntry(req.params.id);

    res.status(200).end();
  } catch (err) {
    return next(err);
  }
});

export { roleLogRouter };