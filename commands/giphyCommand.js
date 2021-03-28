const {MessageEmbed} = require('discord.js');
const g = require('giphy-api')('GjYDYWJOjQJixZSyFRMUoc7YGNTddz71');

module.exports = {
    name: "giphy",
    alias: [],
    min_args: 1,
    run: async (client, message, args) => {

      const gif = await g.random(args.join(' '));

      await message.channel.send({embed: new MessageEmbed()
      .setColor("BLUE")
      .setImage(gif.data.images.original.url)})
    }
}