const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

// Rekursiv olaraq bütün komanda fayllarını oxu
const loadCommands = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            loadCommands(fullPath);
        } else if (file.endsWith('.js')) {
            const command = require(fullPath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                console.log(`✅ Komanda yükləndi: ${command.data.name}`);
            }
        }
    }
};

loadCommands(commandsPath);

const rest = new REST().setToken(process.env.TOKEN);

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