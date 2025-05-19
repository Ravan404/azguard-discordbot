const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const colors = [
    { name: 'Səma Mavisi', id: 'sema-mavisi', colorCode: '#87ceeb', emoji: '🌊' },
    { name: 'Açıq Çəhrayı', id: 'aciq-cehrayi', colorCode: '#ffc0cb', emoji: '🌸' },
    { name: 'Nanə Yaşılı', id: 'nane-yasili', colorCode: '#98ff98', emoji: '🌿' },
    { name: 'Bənövşəyi', id: 'benovseyi', colorCode: '#800080', emoji: '🪻' },
    { name: 'Şaftalı', id: 'saftali', colorCode: '#ff7e5f', emoji: '🍑' },
    { name: 'Qızılgül', id: 'qizilgul', colorCode: '#ff007f', emoji: '🌹' },
    { name: 'Limon Sarısı', id: 'limon-sarisi', colorCode: '#fff44f', emoji: '🍋' },
    { name: 'Dəniz Yaşılı', id: 'deniz-yasili', colorCode: '#9fe2bf', emoji: '🍃' },
    { name: 'Bulud Ağı', id: 'bulud-agi', colorCode: '#f5f5f5', emoji: '☁️' },
    { name: 'Albalı', id: 'albali', colorCode: '#8B0000', emoji: '🍒' }
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
                .setTitle('Rəng Seçimi')
                .setDescription(`# Aşağıdakı düymələrə basaraq istədiyiniz rəngi seçə bilərsiniz:\n\n${(() => {
                    const firstHalf = colors.slice(0, 5);
                    const secondHalf = colors.slice(5, 10);
                    let description = '';

                    for(let i = 0; i < 5; i++) {
                        const leftRole = firstHalf[i] ? `### <@&${interaction.guild.roles.cache.find(role => role.name === firstHalf[i].name)?.id}> ${firstHalf[i].emoji}` : '';
                        const rightRole = secondHalf[i] ? `<@&${interaction.guild.roles.cache.find(role => role.name === secondHalf[i].name)?.id}> ${secondHalf[i].emoji}` : '';
                        
                        let spacing;
                        switch(i) {
                            case 0:
                                spacing = '⠀⠀';
                                break;
                            case 1:
                                spacing = '⠀⠀';
                                break;
                            case 2:
                                spacing = '⠀⠀⠀';
                                break;
                            case 3:
                                spacing = '⠀⠀⠀⠀';
                                break;
                            case 4:
                                spacing = '⠀⠀⠀⠀⠀⠀';
                                break;
                        }
                        
                        description += `${leftRole}${spacing}${rightRole}\n`;
                    }

                    return description;
                })()}`)
                .setColor('#2b2d31');

            const firstRow = new ActionRowBuilder();
            for (let i = 0; i < 5; i++) {
                firstRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(colors[i].id)
                        .setLabel(colors[i].name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(colors[i].emoji)
                );
            }

            const secondRow = new ActionRowBuilder();
            for (let i = 5; i < 10; i++) {
                secondRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(colors[i].id)
                        .setLabel(colors[i].name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(colors[i].emoji)
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