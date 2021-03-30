const {client} = require('../index');
const RolesToAssing = require('../models/rolesToAssing');

client.on('messageReactionAdd', async (reaction, user) => {
  const role = await RolesToAssing.findOne({
    where: {
      guildid: reaction.message.guild.id,
      messageid: reaction.message.id
    }
  })
  if ( role ) {
    await reaction.users.remove(user.id);
  
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const drole = await guild.roles.fetch(role.dataValues.roleid);
    await member.roles.add(drole);
  }

});