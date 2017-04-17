exports.run = async (client, msg, [type, user]) => {
  const added = client.user.friends.get(user.id);
  const blocked = client.user.blocked.get(user.id);
  let message;
  try {
    switch (type) {
      case "add":
        if (user.bot) {
          message = await msg.edit("You can't add a bot as your friend.");
        } else if (!added) {
          await client.user.addFriend(user);
          message = await msg.edit(`Sent friend request to ${user.username}.`);
        } else {
          message = await msg.edit(`${user.username} is already your friend.`);
        }
        break;
      case "remove":
        if (added) {
          await client.user.removeFriend(user);
          message = await msg.edit(`Removed ${user.username} from friends list.`);
        } else {
          message = await msg.edit(`Could not find ${user.username} on your friends list.`);
        }
        break;
      case "block":
        if (!blocked) {
          await client.users.get(user.id).block();
          message = await msg.edit(`Blocked ${user.username}.`);
        } else {
          message = await msg.edit(`You have already blocked ${user.username}.`);
        }
        break;
      case "unblock":
        if (blocked) {
          await client.users.get(user.id).unblock();
          message = await msg.edit(`Removed ${user.username} from your blocked list.`);
        } else {
          message = await msg.edit(`Could not find ${user.username} on your blocked list.`);
        }
        break;
      // no default
    }
  } catch (e) {
    message = await msg.edit(e);
  } finally {
    message.delete(5000);
  }
};

exports.conf = {
  enabled: true,
  selfbot: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "friend",
  description: "You can 'add', 'remove', 'block' and 'unblock' other users.",
  usage: "<add|remove|block|unblock> <user:mention>",
  usageDelim: " ",
  type: "commands",
};
