const Discord = require('discord.js');

module.exports = {
    name: "ban",
    alias: [],
    min_args: 1,
    permission: (member) => (
      member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)
    ),
    run: async (client, message, args) => {

      const user = message.mentions.members.first();

      //remove mention from args
      args.shift();
      const reason = args.join(' ');

      await user.ban({reason: reason})

    }
}