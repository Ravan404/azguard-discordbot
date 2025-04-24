const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const commands = [];
// Komanda fayllarını oxuyuruq
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  }
}

// REST API instansını yaradırıq
const rest = new REST().setToken(process.env.TOKEN);

// Komandaları qeydiyyatdan keçiririk
(async () => {
  try {
    console.log('Slash komandaları yenilənir...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Slash komandaları uğurla yeniləndi!');
  } catch (error) {
    console.error('Komandaları yeniləyərkən xəta baş verdi:', error);
  }
})();