const Discord = require('discord.js');
const UserToDestroyMessage = require('../models/userRestriction');

module.exports = {
    name: "messageRestriction",
    alias: [],
    min_args: 2,
    permission: (member) => (
      member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)
    ),
    run: async (client, message, args) => {

      if (args.length > 2) return

      const action = args.shift();
      let member = message.mentions.members.first();
      if (!member){
        member = await message.guild.members.fetch(args.shift());
      }
      if (!member) {
        return message.reply("You have to mention or put a valid id");
      }

      const userid = member.id;

      try {
        switch (action) {
          case "add":
            const count = await UserToDestroyMessage.count({
              where: {
                userid: userid
              }
            });
            if (count === 0) {
              await UserToDestroyMessage.create({
                userid 
              })
            } else {
              return message.reply("That user has the restriction already");
            }
            break;
        case "remove":
          await UserToDestroyMessage.destroy({
            where: {
              userid
            }
          })
          break;
        }
        await message.reply("Successful update");
      } catch (error) {
        console.log("error:",error);
        await message.reply("An error occurred");
      }
    }
}