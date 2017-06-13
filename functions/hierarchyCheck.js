/**
Check if user is higher in guild's role hierarchy
...Basically an easy way to stop mods from performing actions on admins, etc

    Usage: 
        - executor is the user object of the user executing the moderation command
        - target is the user object of the user the moderation command is affecting
        - guild is the guild object of the guild the command is being executed in
    
    Returns:
        - boolean true if executor is higher
        - boolean false if executor is lower or equal

**/

const func = function(executor, target, guild = null) {
    return new Promise((resolve, reject) => {
        if (guild) {
            guild.fetchMember(executor)
            .then((executorGM) => {
                guild.fetchMember(target)
                .then((targetGM) => {
                    
                    if(executorGM.highestRole.position > targetGM.highestRole.position){
                        resolve(true);
                    } else {
                        resolve(false);
                    }

                    })
                .catch((err) => {
                    client.emit("log", err, "error");
                });
            })
            .catch((err) => {
                client.emit("log", err, "error");
            });

        } else {
            resolve(false);
        }
    });

};

func.conf = { requiredModules: [] };
func.help = {
	name: "hierarchyCheck",
	type: "functions",
	description: "Checks to see that command executor is higher on guild's hierarchy than command target.",
};

module.exports = func;