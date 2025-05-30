const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Təhlükəsiz bağlanma prosedurları
process.on('SIGTERM', () => {
  console.log('SIGTERM siqnalı alındı. Bot təhlükəsiz şəkildə bağlanır...');
  client.destroy();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT siqnalı alındı. Bot təhlükəsiz şəkildə bağlanır...');
  client.destroy();
  process.exit(0);
});

// Gözlənilməz xətaları tutmaq
process.on('unhandledRejection', (error) => {
  console.error('Tutulmamış Promise Xətası:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Tutulmamış Xəta:', error);
});

client.commands = new Collection();

// Global əmrləri yüklə
const globalCommandsPath = path.join(__dirname, 'commands', 'global');
if (fs.existsSync(globalCommandsPath)) {
    const globalCommandFiles = fs.readdirSync(globalCommandsPath).filter(file => file.endsWith('.js'));
    for (const file of globalCommandFiles) {
        const filePath = path.join(globalCommandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`Global əmr "${command.data.name}" yükləndi.`);
        }
    }
}

// Lokal əmrləri yüklə
const localCommandsPath = path.join(__dirname, 'commands', 'local');
if (fs.existsSync(localCommandsPath)) {
    const localCommandFiles = fs.readdirSync(localCommandsPath).filter(file => file.endsWith('.js'));
    for (const file of localCommandFiles) {
        const filePath = path.join(localCommandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`Lokal əmr "${command.data.name}" yükləndi.`);
        }
    }
}

// Hadisə idarəçisi
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

// Bağlantı kəsildiyi halda yenidən qoşulmağa çalış
client.on('disconnect', () => {
  console.log('Bot bağlantısı kəsildi. Yenidən qoşulmağa çalışılır...');
  client.login(process.env.TOKEN);
});

client.login(process.env.TOKEN).catch((error) => {
  console.error('Giriş zamanı xəta baş verdi:', error);
});