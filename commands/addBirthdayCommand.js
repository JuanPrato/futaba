const Discord = require('discord.js');
const Birthday = require('../models/birthday');
const cron = require('node-cron');

module.exports = {
    name: "addbd",
    alias: ["ab"],
    min_args: 2,
    permission: (member) => (
      member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)
    ),
    run: async (client, message, args) => {

      try {

        const stringDate = args.shift();
        const dayMonth = stringDate.split('/')

        const date = new Date(1972, Number(dayMonth[1]), Number(dayMonth[0]));

        const user = message.mentions.users.first();

        schedualeBirthday(date, message.member);

        await Birthday.upsert({
            userid:user.id,
            guildid: message.guild.id,
            usertonotify: message.member.id,
            birthdaydate: date
          }
        )
        await message.reply("Birthday added satisfactorily");

      } catch (err) {
        await message.reply("An error has occurred");
        console.log(err);
      }
    }
}

const schedualeBirthday = async (date, member, birthUser) => {
  cron.schedule(`* * ${date.getDate()} ${date.getMonth()} *`, () => {
    member.send(`Is the birthday of ${birthUser.displayName}`,
    {
      timezone:'US/Central'
    });
  })
}