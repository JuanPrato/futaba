const {client} = require('../index');
const fs = require("fs");
const path = require("path");

const checks = JSON.parse(fs.readFileSync(path.join(__dirname, "../files/data.json"), 'utf8'));
console.log(typeof checks[0].words);

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    for (check of checks) {
      //Check if the word should be at start
      if (check.atStart) {
        if (check.words.some(w => message.content.toLowerCase().startsWith(w))) {
          return message.channel.send(laugh.sample());
        }
      } else {
        //Add one space at start and the end
        const content = " " + message.content.toLowerCase() + " ";
        //check if any of the words plus space at start and the end so it check for the specific word or sentence
        const word_found = check.words.some(w => content.includes(" " + w + " "));
        if (word_found) {
          //check if the response is a reaction
          if (check.isReaction) {
            return message.react(check.ans);
          } else {
            return message.channel.send(check.ans.sample());
          }
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

  const content = message.content.toLowerCase();
  const remove = content.startsWith('$') || content.startsWith('p!') || (message.member && message.member.id === '716390085896962058');

  if (remove)
    removeMess(message);

});

const removeMess = async (message) => {
  setTimeout(() => {
    message.delete();
  }, 1000 * 60 * 3)
}