// events/interactionCreate.js
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

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
                for (const otherRoleId of Object.values(colorRoles)) {
                    if (member.roles.cache.has(otherRoleId)) {
                        await member.roles.remove(otherRoleId);
                    }
                }
                
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
    },
};