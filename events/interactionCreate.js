module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            const colorButtons = [
                'sema-mavisi', 'aciq-cehrayi', 'nane-yasili', 'lavanda',
                'saftali', 'qizilgul', 'limon-sarisi', 'deniz-yasili',
                'bulud-agi', 'gunbatan-narinci'
            ];
            
            if (colorButtons.includes(interaction.customId)) {
                try {
                    const colorNames = {
                        'sema-mavisi': 'Səma Mavisi',
                        'aciq-cehrayi': 'Açıq Çəhrayı',
                        'nane-yasili': 'Nanə Yaşılı',
                        'lavanda': 'Lavanda',
                        'saftali': 'Şaftalı',
                        'qizilgul': 'Qızılgül',
                        'limon-sarisi': 'Limon Sarısı',
                        'deniz-yasili': 'Dəniz Yaşılı',
                        'bulud-agi': 'Bulud Ağı',
                        'gunbatan-narinci': 'Günbatan Narıncı'
                    };
                    const selectedRole = interaction.guild.roles.cache.find(
                        role => role.name === colorNames[interaction.customId]
                    );

                    if (!selectedRole) {
                        return await interaction.reply({
                            content: '❌ Seçilen rəng rolü tapılmadı.',
                            ephemeral: true
                        });
                    }

                    const member = interaction.member;
                    const colorRoles = Object.values(colorNames);
                    
                    for (const roleName of colorRoles) {
                        const role = interaction.guild.roles.cache.find(r => r.name === roleName);
                        if (role && member.roles.cache.has(role.id)) {
                            await member.roles.remove(role);
                        }
                    }

                    await member.roles.add(selectedRole);
                    
                    await interaction.reply({
                        content: `✅ **${colorNames[interaction.customId]}** rəngi seçildi!`,
                        ephemeral: true
                    });
                } catch (error) {
                    console.error('Renk işleme hatası:', error);
                    await interaction.reply({
                        content: '❌ Rəng seçilirkən xəta baş verdi.',
                        ephemeral: true
                    });
                }
            }
            return;
        }

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({ 
                content: 'Komut bulunamadı!', 
                ephemeral: true 
            });
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Komut çalıştırılırken bir hata oluştu:', error);
            await interaction.reply({
                content: 'Komut çalıştırılırken bir hatayla karşılaşıldı.',
                ephemeral: true,
            });
        }
    },
};