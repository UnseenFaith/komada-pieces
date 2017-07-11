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
    const executorMember = await guild.fetchMember(await client.fetchUser(executor.id));
    const targetMember = await guild.fetchMember(await client.fetchUser(target.id));

    return executorMember.highestRole.position > targetMember.highestRole.position;
  }

  return false;
};


module.exports = { requiredModules: [] };
module.exports = {
  name: "hierarchyCheck",
  type: "functions",
  description: "Checks to see that command executor is higher on guild's hierarchy than command target.",
};
