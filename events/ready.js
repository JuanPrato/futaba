const client = require('../index');
const db = new (require('@replit/database'))();


client.on('ready', async () => {
  const mesId = await db.get('roleMessageId');

  if (!mesId) {
    const channel = await client.channels.fetch('823808989049126942');

    const mes = await channel.send("React to this message to get a role");
    await mes.react('🌭');
    await db.set('roleMessageId', mes.id);

  }

})