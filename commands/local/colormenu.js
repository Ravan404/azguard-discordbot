const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colormenu')
        .setDescription('Rəng seçmə menyusunu göstərir')
        .setDefaultMemberPermissions('0'),

    async execute(interaction) {
        try {
            const colorRoles = JSON.parse(fs.readFileSync('./colorRoles.json', 'utf8'));
            const entries = Object.entries(colorRoles);
            
            // Sol ve sağ sütunlar için renkleri böl
            const leftColors = entries.slice(0, 5);
            const rightColors = entries.slice(5, 10);

            // Rəng listesini iki sütun olarak hazırla
            let leftList = '';
            leftColors.forEach(([key, value]) => {
                const colorName = key.replace(/_/g, ' ').split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                leftList += `${value.number}. ${colorName}\n`;
            });

            let rightList = '';
            rightColors.forEach(([key, value]) => {
                const colorName = key.replace(/_/g, ' ').split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                rightList += `${value.number}. ${colorName}\n`;
            });

            const embed = new EmbedBuilder()
                .setTitle('🎨 Rəng Seçimi')
                .setDescription('Aşağıdaki düymələrdən özünüzə rəng seçə bilərsiniz!')
                .addFields(
                    { name: 'Sol Sütun', value: leftList, inline: true },
                    { name: 'Sağ Sütun', value: rightList, inline: true }
                )
                .setColor('#ff00ff')
                .setTimestamp();

            // Sol sütun butonları
            const leftRow = new ActionRowBuilder();
            leftColors.forEach(([key, value]) => {
                leftRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(key)
                        .setLabel(`Rəng ${value.number}`)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            });

            // Sağ sütun butonları
            const rightRow = new ActionRowBuilder();
            rightColors.forEach(([key, value]) => {
                rightRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(key)
                        .setLabel(`Rəng ${value.number}`)
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