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

            // Rəng adlarını və nömrələrini embed üçün hazırla
            let colorList = '';
            for (const [key, value] of Object.entries(colorRoles)) {
                const colorName = key.replace(/_/g, ' ').split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                colorList += `${value.number}. ${colorName}\n`;
            }
            const embed = new EmbedBuilder()
                .setTitle('🎨 Rəng Seçimi')
                .setDescription('Aşağıdaki düymələrdən özünüzə rəng seçə bilərsiniz!')
                .addFields({ 
                    name: 'Mövcud Rənglər:', 
                    value: colorList 
                })
                .setColor('#ff00ff')
                .setTimestamp();

            // Butonları hazırla
            const rows = [];
            let currentRow = [];
            for (const [key, value] of Object.entries(colorRoles)) {
                const button = new ButtonBuilder()
                    .setCustomId(key)
                    .setLabel(`Rəng ${value.number}`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎨');

                currentRow.push(button);

                // Hər 5 buttondan sonra yeni sətir yarat
                if (currentRow.length === 5) {
                    rows.push(new ActionRowBuilder().addComponents(currentRow));
                    currentRow = [];
                }
            }
            // Son sətirdəki buttonları əlavə et (əgər varsa)
            if (currentRow.length > 0) {
                rows.push(new ActionRowBuilder().addComponents(currentRow));
            }

            await interaction.reply({
                embeds: [embed],
                components: rows,
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