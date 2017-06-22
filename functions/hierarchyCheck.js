/**
Check if user is higher in guild's role hierarchy
...Basically an easy way to stop mods from performing actions on admins, etc

    Usage:
        - client scope
        - executor is the user object of the user executing the moderation command
        - target is the user object of the user the moderation command is affecting
        - guild is the guild object of the guild the command is being executed in
    Returns:
        - boolean true if executor is higher
        - boolean false if executor is lower or equal
        - boolean false if no guild
**/

const func = async (client, executor, target, guild = null) => {
  if (guild) {
    const executorMember = await guild.fetchMember(await client.fetchUser(executor.id));
    const targetMember = await guild.fetchMember(await client.fetchUser(target.id));

    return executorMember.highestRole.position > targetMember.highestRole.position;
  }

  return false;
};


func.conf = { requiredModules: [] };

func.help = {
  name: "hierarchyCheck",
  type: "functions",
  description: "Checks to see that command executor is higher on guild's hierarchy than command target.",
};

module.exports = func;
