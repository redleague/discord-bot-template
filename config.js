module.exports = {
  token: "ODYyNTczNTIxMDA3NTQyMzEy.YOaUMQ.KjXPDnlMeD8Z7Cy41uzGx6EtyGU", //this token is invalid make sure you replace it with yours
  prefix: "*",
  supportServer: (code) => `https://discord.gg/${code}`,
  inviteURL: (id, permissions) => `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=${permissions ? permissions : '8'}&scope=bot`,
}
