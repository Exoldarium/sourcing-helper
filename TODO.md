5 tables, user, positions, modification, session, blacklist

user (id: primaryKey, name, password, admin)

Role permissions can be added when the role is created (an id that can be passed to the array)
When the role is created all the values should default to 0

positionTotal (
  id: primaryKey, 
  userId: foreignKey, 
  name (unique), 
  dateAdded, 
  permission(creator, admin, users)
  invitation,
  initialContact,
  replied,
  jobDescription,
  applicationReview,
  proposed,
  accepted,
  rejected,
  followUp
)

positionDataLog (
  id: primaryKey, 
  userId: foreignKey, 
  positionId: foreignKey,
  dateModified,
  invitation,
  initialContact,
  replied,
  jobDescription,
  applicationReview,
  proposed,
  accepted,
  rejected,
  followUp
)

session(id: primaryKey, hashed_sessionid)

cookies(id: primaryKey, userId: foreignKey, cookie)

blacklist(id: primaryKey, userId: foreignKey, cookie)

admin route
  admin should be able to update users through /admin/:id
  admin can disable users
  admin can delete users
  admin can make other admins
