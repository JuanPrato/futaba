const {client, db} = require('../index');

client.on('messageReactionAdd', async (reaction, user) => {

  const messageId = await db.get("roleMessageId");
  console.log(messageId, "===", reaction.message.id)
  if ( reaction.message.id === messageId ) {
    //TODO: add role logic
    await reaction.users.remove(user.id);
  
    await user.send("On develop");
  }

});