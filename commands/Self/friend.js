exports.run = (client, msg, [type, user]) => {
    var added = client.user.friends.find(u => u.username == user.username);
    var blocked = client.user.blocked.find(u => u.username == user.username);
    if (type == "add") {
        if (!added) {
            client.user.addFriend(user).then(() => {
                msg.channel.sendMessage(`Sent friend request to ${user.username}.`)
                    .then(message => message.delete(2000).catch(error => console.log(error.stack)))
                    .catch(error => console.log(error.stack));
            }).catch(error => console.log(error.stack));
        } else {
            msg.channel.sendMessage(`${user.username} is already your friend.`)
                .then(message => message.delete(2000).catch(error => console.log(error.stack)))
                .catch(error => console.log(error.stack));
        }
    } else

    if (type == "remove") {
        if (added) {
            client.user.removeFriend(user).then(() => {
                msg.channel.sendMessage(`Removed ${user.username} from friends list.`)
                    .then(message => message.delete(2000).catch(error => console.log(error.stack)))
                    .catch(error => console.log(error.stack));
            }).catch(error => console.log(error.stack));
        } else {
            msg.channel.sendMessage(`Could not find ${user.username} on your friends list.`)
        }
    } else

    if (type == "block") {
        if (!blocked) {
            client.users.get(user.id).block().then(() => {
                msg.channel.sendMessage(`Blocked ${user.username}.`)
                    .then(message => message.delete(2000).catch(error => console.log(error.stack)))
                    .catch(error => console.log(error.stack));
            }).catch(error => console.log(error.stack));
        } else {
          msg.channel.sendMessage(`You have already blocked ${user.username}.`)
        }
    } else

    if (type == "unblock") {
        if (blocked) {
            client.users.get(user.id).unblock().then(() => {
                msg.channel.sendMessage(`Removed ${user.username} from your blocked list.`)
                    .then(message => message.delete(2000).catch(error => console.log(error.stack)))
                    .catch(error => console.log(error.stack));
            }).catch(error => console.log(error.stack));
        } else {
          msg.channel.sendMessage(`Could not find ${user.username} on your blocked list.`)
        }
    }
};

exports.conf = {
    enabled: true,
    selfbot: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "friend",
    description: "You can 'add', 'remove', 'block' and 'unblock' other users.",
    usage: "<add|remove|block|unblock> <user:mention>",
    usageDelim: " "
};
