// deploy-commands.js
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const rest = new REST().setToken(process.env.TOKEN);

async function deployCommands(guildId = null) {
    const globalCommands = [];
    const localCommands = [];

    // Global əmrləri oxu
    const globalCommandsPath = path.join(__dirname, 'commands', 'global');
    if (fs.existsSync(globalCommandsPath)) {
        const globalCommandFiles = fs.readdirSync(globalCommandsPath).filter(file => file.endsWith('.js'));

        for (const file of globalCommandFiles) {
            const filePath = path.join(globalCommandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                globalCommands.push(command.data.toJSON());
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
                localCommands.push(command.data.toJSON());
            }
        }
    }

    try {
        console.log(`Əmrlər yenilənməyə başlayır...`);

        let data;
        if (guildId) {
            // Local əmrləri müəyyən server üçün yüklə
            console.log(`${localCommands.length} local əmr serverə yüklənir...`);
            data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
                { body: localCommands },
            );
            console.log(`${data.length} local əmr uğurla serverə yükləndi!`);
        } else {
            // Global əmrləri bütün serverlər üçün yüklə
            console.log(`${globalCommands.length} global əmr yüklənir...`);
            data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: globalCommands },
            );
            console.log(`${data.length} global əmr uğurla yükləndi!`);
        }

    } catch (error) {
        console.error(error);
    }
}

// Arqumentləri yoxla
const args = process.argv.slice(2);
if (args.includes('--global')) {
    // Global əmrləri yüklə
    deployCommands();
} else if (args.includes('--guild')) {
    // Local əmrləri yüklə
    const guildId = process.env.TEST_GUILD_ID; // .env faylında təyin edin
    if (!guildId) {
        console.error('TEST_GUILD_ID .env faylında təyin edilməyib!');
        process.exit(1);
    }
    deployCommands(guildId);
} else {
    console.log('İstifadə: node deploy-commands.js [--global|--guild]');
    console.log('--global: Global əmrləri yükləyir');
    console.log('--guild: Local əmrləri test serverinə yükləyir');
}