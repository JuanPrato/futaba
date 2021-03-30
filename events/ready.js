const {client} = require('../index');
const cron = require('node-cron');
const Birthday = require('../models/birthday');
const MessageRoles = require('../models/messageRoles');
const RolesToAssing = require('../models/rolesToAssing');

//message for role check
client.on('ready', async () => {
  const messages = await MessageRoles.findAll();
  messages.forEach(async m => {
    const guild = await client.guilds.fetch(m.dataValues.guildid);
    const channel = await client.channels.fetch(m.dataValues.channelid);
    
    const messages = await RolesToAssing.findAll({
      where: {
        guildid:guild.id
      }
    });

    messages.forEach(async m => {
      const dm = await channel.messages.fetch(m.dataValues.messageid);
      if (!dm) {
        const role = await guild.roles.fetch(m.dataValues.roleid);
        const nm = await channel.send(`ROLE: ${role.name}`);
        await nm.react('🍗');
        await RolesToAssing.update({
          messageid:nm.id
        },{
          where: {
            roleid:role.id
          }
        });
      }
    })

  })


})

//set birthday timers
client.on('ready', async () => {

  const birthdays = await Birthday.findAll();
  birthdays.forEach(async b => {
    const guild = await client.guilds.fetch(b.dataValues.guildid);
    schedualeBirthday(b.dataValues.birthdaydate,
     await guild.members.fetch(b.dataValues.usertonotify),
     await guild.fetch(b.dataValues.userid))
  })


});

const schedualeBirthday = async (date, member, birthUser) => {
  cron.schedule(`* * ${date.getDate()} ${date.getMonth()} *`, () => {
    member.send(`Is the birthday of ${birthUser.displayName}`,
    {
      timezone:'US/Central'
    });
  })
}