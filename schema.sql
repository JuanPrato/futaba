CREATE TABLE IF NOT EXISTS birthday (
  userID TEXT PRIMARY KEY,
  guildid TEXT NOT NULL,
  userToNotify TEXT NOT NULL,
  birthdayDate DATE NOT NULL);

CREATE TABLE IF NOT EXISTS userToDestroyMessage (
  id SERIAL PRIMARY KEY,
  userID TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messageRoles (
  channelid TEXT NOT NULL,
  guildid TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS rolesToAssing (
  roleid TEXT PRIMARY KEY,
  guildid TEXT NOT NULL,
  messageid TEXT NOT NULL
);