const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const colors = [
    { name: 'Səma Mavisi', id: 'sema_mavisi', color: '#87CEEB' },
    { name: 'Açıq Çəhrayı', id: 'aciq_cehrayi', color: '#FFB6C1' },
    { name: 'Nanə Yaşılı', id: 'nane_yasili', color: '#98FF98' },
    { name: 'Lavanda', id: 'lavanda', color: '#E6E6FA' },
    { name: 'Şaftalı', id: 'saftali', color: '#FFDAB9' },
    { name: 'Qızılgül', id: 'qizilgul', color: '#FF69B4' },
    { name: 'Limon Sarısı', id: 'limon_sarisi', color: '#FFFF00' },
    { name: 'Dəniz Yaşılı', id: 'deniz_yasili', color: '#20B2AA' },
    { name: 'Bulud Ağı', id: 'bulud_agi', color: '#F0F8FF' },
    { name: 'Günbatımı Narıncı', id: 'gunbatimi_narinci', color: '#FFA07A' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colormenu')
        .setDescription('Rəng seçmə menyusunu göstərir'),

    async execute(interaction) {
        try {
            const leftColors = colors.slice(0, 5);
            const rightColors = colors.slice(5, 10);

            const embed = new EmbedBuilder()
                .setTitle('🎨 Rəng Seçimi')
                .setDescription('Aşağıdakı düymələrdən özünüzə rəng seçə bilərsiniz!')
                .addFields(
                    { 
                        name: 'Sol Sütun', 
                        value: leftColors.map((c, i) => `${i + 1}. ${c.name}`).join('\n'), 
                        inline: true 
                    },
                    { 
                        name: 'Sağ Sütun', 
                        value: rightColors.map((c, i) => `${i + 6}. ${c.name}`).join('\n'), 
                        inline: true 
                    }
                )
                .setColor('#ff00ff')
                .setTimestamp();

            const leftRow = new ActionRowBuilder();
            leftColors.forEach((color, index) => {
                leftRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(color.id)
                        .setLabel(`${index + 1}`)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            });

            const rightRow = new ActionRowBuilder();
            rightColors.forEach((color, index) => {
                rightRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(color.id)
                        .setLabel(`${index + 6}`)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            });

            await interaction.reply({
                embeds: [embed],
                components: [leftRow, rightRow],
                ephemeral: false
            });

        } catch (error) {
            console.error('Xəta:', error);
            await interaction.reply({
                content: '❌ Rəng menyusu yaradılarkən xəta baş verdi!',
                ephemeral: true
            });
        }
    },
};