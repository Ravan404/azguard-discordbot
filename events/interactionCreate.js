// events/interactionCreate.js
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Slash komandaları üçün
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
            return;
        }

        // Button interaksiyaları üçün
        if (interaction.isButton()) {
            let colorRoles;
            try {
                colorRoles = JSON.parse(fs.readFileSync('./colorRoles.json', 'utf8'));
            } catch {
                return interaction.reply({
                    content: '❌ Rəng rolları tapılmadı!',
                    ephemeral: true
                });
            }

            const roleId = colorRoles[interaction.customId];
            if (!roleId) return;

            const member = interaction.member;

            try {
                if (member.roles.cache.has(roleId)) {
                    await member.roles.remove(roleId);
                    await interaction.reply({ 
                        content: `✅ ${interaction.component.label} rəngi silindi!`, 
                        ephemeral: true 
                    });
                } else {
                    // Digər rəng rollarını sil
                    for (const otherRoleId of Object.values(colorRoles)) {
                        if (member.roles.cache.has(otherRoleId)) {
                            await member.roles.remove(otherRoleId);
                        }
                    }
                    
                    // Yeni rəng rolunu əlavə et
                    await member.roles.add(roleId);
                    await interaction.reply({ 
                        content: `✅ ${interaction.component.label} rəngi verildi!`, 
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