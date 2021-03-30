const Discord = require('discord.js');
const RolesToAssing = require('../models/rolesToAssing');
const MessageRoles = require('../models/messageRoles');

module.exports = {
    name: "roleManagerConfig",
    alias: ["rmc"],
    permission: (member) => (
      member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)
    ),
    run: async (client, message, args) => {
      try {
        const action = args.shift();
        switch (action) {
          case "set":
          {
            const roles = await RolesToAssing.findAll({
              where: {
                guildid:message.guild.id
              }
            });
            const guild = message.guild;
            const channel = message.channel;
            roles.forEach(async r => {
              const role = await guild.roles.fetch(r.dataValues.roleid);
              mes_content = `${role.name}`;
              const mes = await channel.send(mes_content);
              await mes.react('🍗');
              await RolesToAssing.update({
                messageid:mes.id
              },{
                where: {
                  roleid:role.id
                }
              })
            });

            const save = await MessageRoles.findOne({
              where: {
                guildid: message.guild.id
              }
            });
            if (!save) {
              await MessageRoles.create({
                channelid: channel.id,
                guildid: guild.id
              })
            } else {
              await MessageRoles.update({
                channelid: channel.id
              },{
                where: {
                  guildid:guild.id
                }
              })
            }
          }
            break;

          case "add":
          {
            const guild = message.guild;
            const role = message.mentions.roles.first();
            args.shift();
            if (!role)
              return message.reply("You have to mention a role");

            const dbrole = await RolesToAssing.findOne({
              where: {
                roleid:role.id
              }
            })
            if (dbrole) return message.reply("That item already exists");

            const save = await MessageRoles.findOne({
              where: {
                guildid:guild.id
              }
            });

            if (!save) return;

            mes_content = `${role.name}`;

            const channel = guild.channels.cache.get(save.dataValues.channelid);
            const mes = await channel.send(mes_content);
            await mes.react('🍗');

            await RolesToAssing.create({
              messageid:mes.id,
              roleid:role.id,
              guildid:guild.id
            })
          }
          break;
          case "remove":
          {
            const role = message.mentions.roles.first();
            const roleSaved = await RolesToAssing.destroy({
              where: {
                roleid: role.id
              }
            });
            if (!roleSaved) return;
            const save = await MessageRoles.findOne({
              where: {
                guildid: message.guild.id
              }
            });
            if (!save) return;

            const channel = await client.channels.fetch(save.dataValues.channelid);
            const mesD = await channel.messages.fetch(save.dataValues.messageid);

            await mesD.delete();
          }
            break;
          default:
            return message.reply("That not a valid action");
          
        }
        await message.reply("complete update successfully");
      } catch (err) {
        console.log("ERRROR:", err);
        await message.reply("Error ocurred");
      }
    }
}