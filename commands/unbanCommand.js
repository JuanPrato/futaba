const Discord = require('discord.js');

module.exports = {
    name: "unban",
    alias: [],
    min_args: 1,
    permission: (member) => (
      member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)
    ),
    run: async (client, message, args) => {

      const userId = args.shift();

      const guild = message.guild;

      await guild.members.unban(userId);

    }
}