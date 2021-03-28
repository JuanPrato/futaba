const client = require('../index');
const fs = require("fs");
const path = require("path");

laugh = [
  "kekw",
  "lol",
  "pfft xD",
  "lmao",
  "hue hue~"
]

const checks = JSON.parse(fs.readFileSync(path.join(__dirname, "../files/data.json"), 'utf8'));
console.log(typeof checks[0].words);

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    
    const message_words = message.content.toLowerCase().split(' ');

    if (message_words[0] === 'xd') {
      return message.channel.send(laugh.sample());
    }

    for (check of checks) {
      const word_found = message_words.some(mw => check.words.some(w => w === mw))
      if (word_found) {
        if (check.isReaction) {
          return message.react(check.ans);
        } else {
          return message.channel.send(check.ans.sample());
        }
      }
    }

})


client.on("message", async (message) => {

    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(" ");
    const command = args.shift();

    const cmd = client.commands.get(command) || client.commands.find((c) => c.alias.includes(command));

    if (cmd) {
      if (cmd.permission && !cmd.permission(message.member)){
        return message.reply("You're not the chosen one <:HyperDweet:786874503258177537>");
      }
      if (cmd.min_args && args.length < cmd.min_args) {
        return message.reply("Dummi, I need more than that");
      }
      cmd.run(client, message, args);
      return
    }

})

client.on('message', async (message) => {

  const remove = message.content.startsWith('$' || 'P!') || message.member.id === '716390085896962058';

  if (remove)
    removeMess(message);

});

const removeMess = async (message) => {
  setTimeout(() => {
    message.delete();
  }, 1000 * 60 * 3)
}