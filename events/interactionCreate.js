module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Slash komut kontrolü
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`${interaction.commandName} komutu bulunamadı.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: '❌ Komut çalıştırılırken bir hata oluştu!',
                    ephemeral: true
                });
            }
            return;
        }

        // Buton kontrolü
        if (interaction.isButton()) {
            // Renk listesi
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

            try {
                const selectedColor = colors.find(c => c.id === interaction.customId);
                if (!selectedColor) return;

                let role = interaction.guild.roles.cache.find(r => r.name === selectedColor.name);
                
                if (!role) {
                    return await interaction.reply({ 
                        content: '❌ Rəng rolu tapılmadı!', 
                        ephemeral: true 
                    });
                }

                const memberRoles = interaction.member.roles.cache;
                const colorRoles = interaction.guild.roles.cache.filter(r => 
                    colors.some(c => c.name === r.name)
                );

                for (const [_, colorRole] of colorRoles) {
                    if (memberRoles.has(colorRole.id)) {
                        await interaction.member.roles.remove(colorRole);
                    }
                }

                await interaction.member.roles.add(role);
                
                await interaction.reply({ 
                    content: `✅ **${selectedColor.name}** rəngi seçildi!`, 
                    ephemeral: true 
                });

            } catch (error) {
                console.error('Xəta:', error);
                await interaction.reply({ 
                    content: '❌ Rol verilərkən xəta baş verdi!', 
                    ephemeral: true 
                });
            }
        }
    },
};