# Git   Commands 
git init - Create a new git repo
git status - View the changes to your project code
git add -Add files to the staging area
git commit - Creates a new commit in repo with files from staging area
git commit -m "INSERT MESSAGE HERE" (when I made the add before, new files generally)
git commit -a -m "INSERT MSG HERE" (When I modified existing files, and no add new ones)
git log - View recent commits
git push - send the committed changes to our github REmote 
git reset - to unstage all the staged files.

Express prod server
AS the live-server and other scripts command we are using they allows us to reload web pack dinamically and other dev features which would be heavy or unnecessary for production, then we created a new folder
server with server.js to use an node Express production server
expressjs.com 
this file will run from the Node command line (not using webpack)
>node server/server.js

