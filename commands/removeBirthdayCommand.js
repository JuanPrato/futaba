const Discord = require('discord.js');
const Birthday = require('../models/birthday');
const cron = require('node-cron');

module.exports = {
    name: "rmvbd",
    alias: ["rb"],
    min_args: 1,
    permission: (member) => (
      member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)
    ),
    run: async (client, message, args) => {

      try {
        const user = message.mentions.users.first();

        await Birthday.destroy({
            where: {
              userid: user.id,
              guildid: message.guild.id
            }
          }
        )
        await message.reply("Birthday removed satisfactorily");

      } catch (err) {
        await message.reply("An error has occurred");
        console.log(err);
      }
    }
}