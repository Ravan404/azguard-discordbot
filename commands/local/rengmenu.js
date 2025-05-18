const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const colors = [
    { name: 'Səma Mavisi', id: 'sema-mavisi', colorCode: '#87ceeb' },
    { name: 'Açıq Çəhrayı', id: 'aciq-cehrayi', colorCode: '#ffc0cb' },
    { name: 'Nanə Yaşılı', id: 'nane-yasili', colorCode: '#98ff98' },
    { name: 'Bənövşəyi', id: 'benovseyi', colorCode: '#800080' },
    { name: 'Şaftalı', id: 'saftali', colorCode: '#ffdab9' },
    { name: 'Qızılgül', id: 'qizilgul', colorCode: '#ff007f' },
    { name: 'Limon Sarısı', id: 'limon-sarisi', colorCode: '#fff44f' },
    { name: 'Dəniz Yaşılı', id: 'deniz-yasili', colorCode: '#9fe2bf' },
    { name: 'Bulud Ağı', id: 'bulud-agi', colorCode: '#f5f5f5' },
    { name: 'Günbatan Narıncı', id: 'gunbatan-narinci', colorCode: '#ff7e5f' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rengmenu')
        .setDescription('Rəng menyusunu göstərir.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            // Rolları yoxla və yarat
            for (const color of colors) {
                let role = interaction.guild.roles.cache.find(r => r.name === color.name);
                
                if (!role) {
                    role = await interaction.guild.roles.create({
                        name: color.name,
                        color: color.colorCode,
                        reason: 'Rəng rolu yaradıldı'
                    });
                }
            }

            const embed = new EmbedBuilder()
                .setTitle('# Rəng Seçimi')
                .setDescription('# Aşağıdakı düymələrə basaraq istədiyiniz rəngi seçə bilərsiniz:')
                .addFields(
                    { name: '\u200B', value: colors.slice(0, 5).map(color => 
                        `# <@&${interaction.guild.roles.cache.find(role => role.name === color.name)?.id}>`).join('\n\n'), inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '\u200B', value: colors.slice(5, 10).map(color => 
                        `# <@&${interaction.guild.roles.cache.find(role => role.name === color.name)?.id}>`).join('\n\n'), inline: true }
                )
                .setColor('#2b2d31');

            const firstRow = new ActionRowBuilder();
            for (let i = 0; i < 5; i++) {
                firstRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(colors[i].id)
                        .setLabel(colors[i].name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            }

            const secondRow = new ActionRowBuilder();
            for (let i = 5; i < 10; i++) {
                secondRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(colors[i].id)
                        .setLabel(colors[i].name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            }

            await interaction.reply({
                embeds: [embed],
                components: [firstRow, secondRow]
            });

        } catch (error) {
            console.error('Xəta baş verdi:', error);
            await interaction.reply({
                content: '❌ Rəng menyusu yüklənərkən xəta baş verdi.',
                ephemeral: true
            });
        }
    },
};