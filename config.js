module.exports = {
  token: "00000000000000000000000000000", //this token is invalid make sure you replace it with yours
  prefix: "*",
  dev: true,
  supportServer: (code) => `https://discord.gg/${code}`,
  inviteURL: (id, permissions) => `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=${permissions ? permissions : '8'}&scope=bot`,
}
