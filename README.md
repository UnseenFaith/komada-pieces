# Komada Pieces repository

This repository contains the various *Pieces* submitted by users and collaborators.

## What are Pieces?

*Pieces* are simply parts of code that can be downloaded and installed straight
into your [Komada](http://github.com/eslachance/komada) bot installation.

Pieces can include:

- **Commands**: A single command file, which adds itself to the help and is
available to users with the appropriate permission.
- **Functions**: Functions that are made available to other Pieces. These
functions can range from utility functions to blocks of code repeated enough
to justify making a function out of it. They are not seen by the members.
- **Data Providers**: Support for a specific database type. By default a very
small amount of DBs are supported, but you can extend the support by adding a
provider for whatever database you choose, and configure it to point to your
own database.
- **Inhibitors**: Inhibitors are blocks of code that run before a command is
run and may take action on the message received, and block a command from
running in certain cases (thus *inhibit* a command).
- **Packages**: A *Pieces Package* containing one or more of other pieces.
Packages are presumed to work as a single entity, meaning, custom functions
are used by commands, so are data providers, etc.

## Submitting Pieces

To submit your own pieces for approval (quick steps):

- For this repository
- Create a new piece in the appropriate folder in `./submitted`
- Create a Pull Request to the repository.
- Be patient. Someone will approve/deny it as soon as they can.

We will automatically deny PRs that:

- Are not created in the `./submitted`
- Have identical functionality to an existing *Piece*
- Have code that breaks/does not catch errors/etc
- Contain NSFW, NSFL contents or contents we deem to be unacceptable.
- Contain hacks/exploits/etc
- Have code that might cause a bot to break the TOS or Ratelimits
- Any reason **WE** feel is valid.

> WE RESERVE THE RIGHT TO REFUSE ANY CONTENTS FOR ANY REASON WHETHER YOU
ACCEPT THEM OR NOT. 
