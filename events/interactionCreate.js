module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            await interaction.deferReply({ ephemeral: true });
            
            const colorButtons = [
                'sema-mavisi', 'aciq-cehrayi', 'nane-yasili', 'benovseyi',
                'saftali', 'qizilgul', 'limon-sarisi', 'deniz-yasili',
                'bulud-agi', 'albali'
            ];
            
            if (colorButtons.includes(interaction.customId)) {
                try {
                    const colorNames = {
                        'sema-mavisi': 'Səma Mavisi',
                        'aciq-cehrayi': 'Açıq Çəhrayı',
                        'nane-yasili': 'Nanə Yaşılı',
                        'benovseyi': 'Bənövşəyi',
                        'saftali': 'Şaftalı',
                        'qizilgul': 'Qızılgül',
                        'limon-sarisi': 'Limon Sarısı',
                        'deniz-yasili': 'Dəniz Yaşılı',
                        'bulud-agi': 'Bulud Ağı',
                        'albali': 'Albalı'
                    };

                    console.log('Seçilmiş rəng ID:', interaction.customId);
                    console.log('Axtarılan rol adı:', colorNames[interaction.customId]);

                    const selectedRole = interaction.guild.roles.cache.find(
                        role => role.name === colorNames[interaction.customId]
                    );

                    console.log('Tapılan rol:', selectedRole ? selectedRole.name : 'Rol tapılmadı');

                    if (!selectedRole) {
                        return await interaction.editReply({
                            content: '❌ Seçilmiş rəng rolu tapılmadı.'
                        });
                    }

                    const member = interaction.member;

                    // Əgər istifadəçidə artıq bu rol varsa, onu silək
                    if (member.roles.cache.has(selectedRole.id)) {
                        await member.roles.remove(selectedRole);
                        return await interaction.editReply({
                            content: `🗑️ **${colorNames[interaction.customId]}** rəngi silindi!`
                        });
                    }

                    // Digər rəng rollarını silək
                    const colorRoles = Object.values(colorNames);
                    for (const roleName of colorRoles) {
                        const role = interaction.guild.roles.cache.find(r => r.name === roleName);
                        if (role && member.roles.cache.has(role.id)) {
                            await member.roles.remove(role);
                        }
                    }

                    // Yeni rolu əlavə edək
                    await member.roles.add(selectedRole);
                    
                    await interaction.editReply({
                        content: `✅ **${colorNames[interaction.customId]}** rəngi seçildi!`
                    });
                } catch (error) {
                    console.error('Rəng emalı xətası:', error);
                    await interaction.editReply({
                        content: '❌ Rəng seçilən zaman xəta baş verdi.'
                    });
                }
            }
            return;
        }

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({ 
                content: 'Əmr tapılmadı!', 
                ephemeral: true 
            });
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Əmr icra edilərkən xəta baş verdi:', error);
            await interaction.reply({
                content: 'Əmr icra edilərkən xəta baş verdi.',
                ephemeral: true
            });
        }
    },
};