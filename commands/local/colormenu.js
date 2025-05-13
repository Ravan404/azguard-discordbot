const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colormenu')
        .setDescription('Rəng seçmə menyusunu göstərir'),

    async execute(interaction) {
        try {
            // JSON faylından rolları oxu
            const colorRoles = JSON.parse(fs.readFileSync('./colorRoles.json', 'utf8'));

            // Menyu seçimlərini hazırla
            const options = Object.entries(colorRoles).map(([value, data]) => ({
                label: `Rəng ${data.number}`,
                value: value,
                emoji: '🎨'
            }));

            // Embed yarat
            const embed = new EmbedBuilder()
                .setTitle('🎨 Rəng Seçimi')
                .setDescription('Aşağıdakı menyudan özünüzə rəng seçin!')
                .setColor('#ff00ff');

            // Seçim menyusunu yarat
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('color_select')
                        .setPlaceholder('Bir rəng seçin')
                        .addOptions(options)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
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