const {client, db} = require('../index');

//message for role check
client.on('ready', async () => {
  const mesId = await db.get('roleMessageId');
  console.log(mesId);
  const channel = await client.channels.fetch('823808989049126942');
  if (!mesId) {

    const mes = await channel.send("React to this message to get a role");
    await mes.react('🌭');
    await db.set('roleMessageId', mes.id);
    return;
  }
  await channel.messages.fetch(mesId);

})