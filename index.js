const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(() =>
	console.log(`Example app listening at http://localhost:${app.port}`)
);

//////////////////////////////////////////////////////////////////////

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');

client.prefix = '*';

client.commands = new Discord.Collection();

let files = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const f of files) {
	const command = require('./commands/' + f);
	client.commands.set(command.name, command);
}

//Load events
const loadEvents = () =>
	fs.readdirSync(path.join(__dirname, '/events/'))
		.forEach(file => file.endsWith('.js') && require(`./events/${file}`));


client.on('ready', () => {
  loadEvents();
	client.user.setActivity('you be a degen', { type: 'WATCHING' });
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

module.exports = client;
