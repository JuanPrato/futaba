const client = require('../index');
const Database = require('@replit/database');
const db = new Database();

client.on('messageReactionAdd', async (reaction, user) => {

  const messageId = db.get("roleMessageId");

  if ( reaction.message.id === messageId ) {
    //TODO: add role logic
  }

});