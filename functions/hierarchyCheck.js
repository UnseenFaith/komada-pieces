/**
 * Check if user is higher in guild's role hierarchy
 * @param {Client} client The Client object.
 * @param {User} executor The User instance of the user who is executing the command.
 * @param {User} target The User instance of the user targetted.
 * @param {Guild} guild The Guild instance where the command is being executed.
 * @returns {Promise<boolean>}
 */
module.exports = async (client, executor, target, guild = null) => {
  if (guild) {
    const executorMember = await guild.members.resolve(await client.users.resolve(executor.id));
    const targetMember = await guild.members.resolve(await client.users.resolve(target.id));

    return executorMember.roles.highest.position > targetMember.roles.highest.position;
  }

  return false;
};


module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: "hierarchyCheck",
  type: "functions",
  description: "Checks to see that command executor is higher on guild's hierarchy than command target.",
};
