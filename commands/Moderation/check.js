exports.run = (client, msg) => {
	let mtime = msg.createdTimestamp;
	let check = msg.guild.members.filter( m => (mtime - m.user.createdTimestamp) <= 1800000);
	if (check.size > 0) {
	let result = check.map(u=> `${u.user.username}#${u.user.discriminator}, Created:${((mtime - u.user.createdTimestamp)/1000/60).toFixed(0)} min(s) ago`).join('\n');
	msg.reply(`The following users are less then 30 mins old\n \`\`\`\n ${result}\n\`\`\` `)
	} else {
		msg.reply('No users less then 30 mins old were found')
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 3,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: "check",
	description: "Checks the guild for any user accounts less then 30 mins old.",
	usage: "",
	usageDelim: ""
};
