const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const colors = [
    { name: 'Səma Mavisi', color: '#87CEEB' },
    { name: 'Açıq Çəhrayı', color: '#FFB6C1' },
    { name: 'Nanə Yaşılı', color: '#98FF98' },
    { name: 'Lavanda', color: '#E6E6FA' },
    { name: 'Şaftalı', color: '#FFDAB9' },
    { name: 'Qızılgül', color: '#FF69B4' },
    { name: 'Limon Sarısı', color: '#FFFF00' },
    { name: 'Dəniz Yaşılı', color: '#20B2AA' },
    { name: 'Bulud Ağı', color: '#F0F8FF' },
    { name: 'Günbatımı Narıncı', color: '#FFA07A' }
];

client.once('ready', async () => {
    try {
        // Botun olduğu ilk sunucuyu al
        const guild = client.guilds.cache.first();
        if (!guild) {
            console.error('Server tapılmadı!');
            return;
        }

        // Her renk için rol oluştur
        for (const color of colors) {
            // Rol var mı diye kontrol et
            let role = guild.roles.cache.find(r => r.name === color.name);

            // Rol yoksa oluştur
            if (!role) {
                role = await guild.roles.create({
                    name: color.name,
                    color: color.color,
                    reason: 'Rəng rolu yaradıldı'
                });
                console.log(`${color.name} rolu yaradıldı`);
            } else {
                console.log(`${color.name} rolu artıq mövcuddur`);
            }
        }

        console.log('Bütün rollar uğurla yaradıldı!');
        process.exit();

    } catch (error) {
        console.error('Xəta baş verdi:', error);
        process.exit(1);
    }
});

client.login(process.env.TOKEN);