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
        - boolean false if either user isn't in the guild

        **/

const func = async (client, executor, target, guild = null) => {
  try {
      if (guild) {
          const executorMember = await guild.fetchMember(executor);
          const targetMember = await guild.fetchMember(target);

          if (executorMember.highestRole.position > targetMember.highestRole.position) {
              return true;
          }
      }
  } catch (err) {
      client.emit("log", err, "error");
      client.emit("log", "Failed to fetch guildMember(s). Probably at least one isn't in this guild?", "error");
      return false;
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
