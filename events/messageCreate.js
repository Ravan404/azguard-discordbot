module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    // Əgər mesaj botdan gəlirsə, cavab vermə
    if (message.author.bot) return;

    // Prefix əsaslı komandaları burada emal edə bilərsiniz
    // Nümunə: if (message.content.startsWith('!')) { ... }
  },
};