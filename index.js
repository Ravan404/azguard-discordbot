const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Əsas client yaratmaq
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Komandaları saxlamaq üçün kolleksiya yaradırıq
client.commands = new Collection();

// Komanda fayllarını yükləmək
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  }
}

// Event fayllarını yükləmək
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Botu işə salmaq
client.login(process.env.TOKEN);
// index.js içindəki əmrlərin oxunduğu hissə
const commands = new Collection();

// Global əmrləri oxu
const globalCommandsPath = path.join(__dirname, 'commands', 'global');
if (fs.existsSync(globalCommandsPath)) {
    const globalCommandFiles = fs.readdirSync(globalCommandsPath).filter(file => file.endsWith('.js'));
    for (const file of globalCommandFiles) {
        const filePath = path.join(globalCommandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        }
    }
}

// Local əmrləri oxu
const localCommandsPath = path.join(__dirname, 'commands', 'local');
if (fs.existsSync(localCommandsPath)) {
    const localCommandFiles = fs.readdirSync(localCommandsPath).filter(file => file.endsWith('.js'));
    for (const file of localCommandFiles) {
        const filePath = path.join(localCommandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        }
    }
}