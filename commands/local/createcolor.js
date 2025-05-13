const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

const colors = [
    { name: 'Səma Mavisi', hexCode: '#87CEEB', value: 'sema_mavisi' },
    { name: 'Açıq Çəhrayı', hexCode: '#FFC0CB', value: 'aciq_cehrayi' },
    { name: 'Nanə Yaşılı', hexCode: '#98FF98', value: 'nane_yasili' },
    { name: 'Lavanda', hexCode: '#E6E6FA', value: 'lavanda' },
    { name: 'Şaftalı', hexCode: '#FFDAB9', value: 'saftali' },
    { name: 'Qızılgül', hexCode: '#FF007F', value: 'qizilgul' },
    { name: 'Limon Sarısı', hexCode: '#FFF44F', value: 'limon_sarisi' },
    { name: 'Dəniz Yaşılı', hexCode: '#9FE2BF', value: 'deniz_yasili' },
    { name: 'Bulud Ağı', hexCode: '#F5F5F5', value: 'bulud_agi' },
    { name: 'Günbatan Narıncı', hexCode: '#FF7E5F', value: 'gunbatan_narinci' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createcolor')
        .setDescription('Rəng rollarını yaradır')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const guild = interaction.guild;
        let colorRoles = {};

        await interaction.deferReply({ ephemeral: true });

        try {
            for (const [index, color] of colors.entries()) {
                // Mövcud rol varsa yenilə, yoxdursa yenisini yarat
                let role = guild.roles.cache.find(r => r.name === color.name);
                if (!role) {
                    role = await guild.roles.create({
                        name: color.name,
                        color: color.hexCode,
                        reason: 'Rəng rolu yaradıldı'
                    });
                } else {
                    await role.edit({
                        color: color.hexCode
                    });
                }
                colorRoles[color.value] = {
                    id: role.id,
                    number: index + 1
                };
            }

            // Rolları JSON faylına yadda saxla
            fs.writeFileSync('./colorRoles.json', JSON.stringify(colorRoles, null, 4));

            await interaction.editReply('✅ Bütün rəng rolları uğurla yaradıldı!');
        } catch (error) {
            console.error(error);
            await interaction.editReply('❌ Rollar yaradılarkən xəta baş verdi!');
        }
    },
};