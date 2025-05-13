module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Eğer bir buton tıklaması değilse işlemi bitir
        if (!interaction.isButton()) return;

        // Renk listesi - createcolor.js ile aynı sırada olmalı
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
            // Tıklanan butonun ID'sine göre rengi bul
            const selectedColor = colors.find(c => c.id === interaction.customId);
            if (!selectedColor) return;

            // Rolü bul
            let role = interaction.guild.roles.cache.find(r => r.name === selectedColor.name);
            
            // Rol bulunamadıysa hata mesajı gönder
            if (!role) {
                return await interaction.reply({ 
                    content: '❌ Rəng rolu tapılmadı!', 
                    ephemeral: true 
                });
            }

            // Kullanıcının mevcut renk rollerini kaldır
            const memberRoles = interaction.member.roles.cache;
            const colorRoles = interaction.guild.roles.cache.filter(r => 
                colors.some(c => c.name === r.name)
            );

            for (const [_, colorRole] of colorRoles) {
                if (memberRoles.has(colorRole.id)) {
                    await interaction.member.roles.remove(colorRole);
                }
            }

            // Yeni renk rolünü ver
            await interaction.member.roles.add(role);
            
            // Başarılı mesajı gönder
            await interaction.reply({ 
                content: `✅ **${selectedColor.name}** rəngi seçildi!`, 
                ephemeral: true 
            });

        } catch (error) {
            // Hata durumunda konsola yazdır ve kullanıcıya bildir
            console.error('Xəta:', error);
            await interaction.reply({ 
                content: '❌ Rol verilərkən xəta baş verdi!', 
                ephemeral: true 
            });
        }
    },
};