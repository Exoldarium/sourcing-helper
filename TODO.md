5 tables, user, positions, modification, session, blacklist

user (id: primaryKey, name, password, admin)

position (
  id: primaryKey, 
  userId: foreignKey, 
  name, 
  dateAdded, 
  dateModified, 
  permission(creator, admin, users)
)

positionData (
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

session(id: primaryKey, userId: foreignKey, active)

cookies(id: primaryKey, userId: foreignKey, cookie)

blacklist(id: primaryKey, userId: foreignKey, cookie)
