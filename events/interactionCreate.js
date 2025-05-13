const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ 
                    content: 'Komanda icra edilərkən xəta baş verdi.', 
                    ephemeral: true 
                });
            }
        } else if (interaction.isButton()) {
            let colorRoles;
            try {
                colorRoles = JSON.parse(fs.readFileSync('./colorRoles.json', 'utf8'));
            } catch {
                return interaction.reply({
                    content: '❌ Rəng rolları tapılmadı!',
                    ephemeral: true
                });
            }

            const roleInfo = colorRoles[interaction.customId];
            if (!roleInfo) return;

            const member = interaction.member;
            const roleId = roleInfo.id;

            try {
                if (member.roles.cache.has(roleId)) {
                    await member.roles.remove(roleId);
                    await interaction.reply({ 
                        content: `✅ ${interaction.customId.replace(/_/g, ' ')} rəngi silindi!`, 
                        ephemeral: true 
                    });
                } else {
                    // Diğer renk rollerini kaldır
                    for (const [, value] of Object.entries(colorRoles)) {
                        if (member.roles.cache.has(value.id)) {
                            await member.roles.remove(value.id);
                        }
                    }
                    
                    await member.roles.add(roleId);
                    await interaction.reply({ 
                        content: `✅ ${interaction.customId.replace(/_/g, ' ')} rəngi verildi!`, 
                        ephemeral: true 
                    });
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({ 
                    content: '❌ Rol verilərkən xəta baş verdi!', 
                    ephemeral: true 
                });
            }
        }
    },
};