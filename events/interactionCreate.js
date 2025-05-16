module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            await interaction.deferReply({ ephemeral: true });
            
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
                        'benovseyi': 'Bənövşəyi',
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
                        return await interaction.editReply({
                            content: '❌ Seçilmiş rəng rolu tapılmadı.'
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