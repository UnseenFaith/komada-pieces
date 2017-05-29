const baseUrl = "https://anidiotsguide.gitbooks.io/discord-js-bot-guide";
const guides = {
  home: { url: "/", snippet: "Some technical details about the bot guide, and a donation link if you're inclined to be as generous with your petty cash as I was with my time writing this!" },
  faq:{url:"/frequently-asked-questions.html",snippet:"In this page, some very basic, frequently-asked questions are answered. It's important to understand that **these examples are generic** and will most likely not work if you just copy/paste them in your code."},
//  Getting Started
  editor: {url:"/getting-started/installing_and_using_a_proper_editor.html", snippet: "Let's take a moment to appreciate the fact that the best code, is not just code that _works_ but also code that is _readable._",},
  gslong: { url: "/getting-started/the-long-version.html", snippet: "So, you want to write a bot and you know some JavaScript, or maybe even node.js. You want to do cool things like a music bot, tag commands, random image searches, the whole shebang. Well you're at the right place!" },
  gswin: { url: "/getting-started/windows-tldr.html", snippet: "**Windows TL;DR** version of the getting started guide. When you have exactly 0 time to lose and no desire to fuck around." },
  gslinux: { url: "/getting-started/linux-tldr.html", snippet: "**Linux TL;DR** version of the getting started guide. When you have exactly 0 time to lose and no desire to fuck around." },
  firstbot: { url: "/coding-walkthroughs/your_basic_bot.html", snippet: "In this chapter I'll guide you through the development of a simple bot with some useful commands. We'll start with the example we created in the first chapter and expand upon it." },
//  Understanding / Information
  roles: { url: "/information/understanding_roles.html", snippet: "Roles are a powerful feature in Discord, and admittedly have been one of the hardest parts to master in discord.js. This walkthrough aims at explaining how roles and permissions work. We'll also explore how to use roles to protect your commands." },
  events:{url:"/information/understanding_events_and_handlers.html",snippet: "We already explored one event handler in Your Basic Bot, the `message` handler. Now let's take a look at some of the most important handlers that you will use, along with an example."},
  collection: { url: "/information/understanding_collections.html", snippet: "In this page we will explore Collections, and how to use them to grab data from various part of the API." },
  async:{url:"/information/understanding_asyncawait.html", snippet: "When an async function is called, it returns a Promise. When the async function returns a value, the Promise will be resolved with the returned value."},
//  Coding Guides
  stjson: {url:"/coding-guides/storing-data-in-a-json-file.html", snippet:"In this example we're going to read and write data to and from a JSON file. We'll keep is simple by using this JSON file for a points system."},
  stsqlite: {url:"/coding-guides/storing-data-in-an-sqlite-file.html", snippet:"As mentioned in the Storing Data in a JSON file guide, JSON files could get corrupted due to race conditions. However SQLite doesn't suffer from that and is a better method of storing data between boot ups than JSON."},
  webhp1: {url:"/coding-guides/discord-webhooks-part-1.html", snippet:"This has been a rather demanded topic recently, everyone wants to know how to use the webhooks, so here I am with this guide to explain the basic coverage of the webhooks."},
  cmdhndlr: {url:"/coding-guides/a-basic-command-handler.html", snippet:"A Command Handler is essentially a way to separate your commands into different files, instead of having a bunch of `if/else` conditions inside your code (or a `switch/case` if you're being fancy)."},
  musicbot: {url:"/coding-guides/coding_a_music_bot.html", snippet:"Everyone including their grandparents want to create a music bot, I myself have created a music bot and believe me it's not as easy as you would think."},
  cleverbot: {url:"/coding-guides/cleverbot-integration.html", snippet:"I've had this request since I started my Idiot's Guide, in fact it was one of the very first requests I had, but I had a feeling it would be a disappointing short episode, maybe a 5 minute long episode. But for a written guide it'd be perfect!"},
// Examples
  msgxusr: {url:"/examples/welcome_message_every_x_users.html", snippet:"This example will show how to keep an array/object of new users coming into a server. Then, when this array reaches a certain number of users, it shows a message welcoming those users as a group."},
  msgra: {url:"/examples/message_reply_array.html", snippet:"This sample shows the use of a simple string array to reply specific strings when triggered."},
  args: { url: "/examples/command_with_arguments.html", snippet: "In Your First Bot, we explored how to make more than one command. These commands all started with a prefix, but didn't have any *arguments* : extra parameters used to vary what the command actually does." },
  selfbot: { url: "/examples/selfbots_are_awesome.html", snippet: "So, my friend, you are wondering what is a selfbot? Well let me tell you a little story. Stay a while, and listen!" },
  eval: { url: "/examples/making-an-eval-command.html", snippet: "Eval bots are AWESOME. But eval bots are DANGEROUS. Read up on them here." },
  embeds: {url:"/examples/using-embeds-in-messages.html", snippet:"You've seen them all around - these sexy dark grey boxes with a nice color on the left, images, and **tables** oh my god. So nice-looking, right? Well, let me show you how to make them!"},
//  Other-Guides
  github: {url:"/other-guides/using-git-to-share-and-update-code.html", snippet:"Have you ever come to a point where you're editing code, removing and adding and changing stuff and all of a sudden you realize, _Shit, I deleted this piece and I need to rewrite or re-use it now. Damn!_"},
};

exports.run = (client, msg, [keyword]) => {
  if (guides[keyword]) {
    const details = guides[keyword];
    return msg.channel.send(`${details.snippet}\n**Read More**: <${baseUrl}${details.url}>`);
  } else if (keyword === "list") {
    return msg.channel.send(`Available keywords for this command:\n${Object.keys(guides).join(", ")}`);
  } else {
    const details = guides.home;
    return msg.channel.send(`${details.snippet}\n**Read More**: <${baseUrl}${details.url}>`);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "guide",
  description: "Returns page details from root's awesome bot guide.",
  usage: "[list:literal|keyword:str]",
  usageDelim: "",
  type: "commands",
};
