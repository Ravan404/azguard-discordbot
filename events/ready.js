module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Bot aktiv olaraq qoşuldu: ${client.user.tag}`);
  },
};