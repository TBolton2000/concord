# concord

---

## (Not So) Quick Start

Howdy everyone! Welcome to the new *concord* (name still pending) repository!

Here is a walkthrough of all of the tools that you will need and how to install all of them.

**IF YOU HAVE ANY QUESTIONS, PLEASE REACH OUT TO TREVOR**

##### Windows Only:
1. WSL
2. Ubuntu for WSL
3. Windows Terminal (optional, but a very good terminal)

##### All:
1. Visual Studio Code
2. Node.js
3. nvm
4. git
5. This repo

### Windows Subsystem for Linux (WSL)
This is a low overhead virtual machine that runs a Linux distrubtion on a Windows computer. We will be using this to standardize all of our terminals/command prompts in a Unix-like shell.
1. Run Windows PowerShell as Administrator
    1. Press windows key and type PowerShell, click `Run as Administrator` on the right side of the search window
2. Run the command `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
3. Restart your computer
4. WSL should be activated!

### Ubuntu for WSL
1. Open the `Microsoft Store`, press windows key and type Microsoft Store.
2. Search for `Ubuntu` and install.
3. You should now be able to open the `Ubuntu` application on your computer and have a fully functional Unix-like shell

### Windows Terminal
1. Open the `Microsoft Store`
2. Search for `Windows Terminal` and install
3. You should now have a terminal that will allow you to run PowerShell and Ubuntu
4. Press the drop down arrow at the top to open an `Ubuntu` terminal.

### Visual Studio Code
1. Download from `https://code.visualstudio.com/`
2. Open Visual Studio Code
3. Go to Extensions (or press Ctrl+Shift+X) and search and install for the extension `Remote - WSL`
4. You can close this for now

### Node.js
1. Download 12.18.3 LTS from `https://nodejs.org/en/`
2. Install

### nvm (node version manager)
1. Open Ubuntu in Windows Terminal or Terminal on Mac
2. Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
3. We will use this later when finalizing the setup for the git repository

### git 
1. Check if already installed:
    1. Open Ubuntu in Windows Terminal or Terminal on Mac
    2. run `git --version` if it returns a version number, then you're done!
2. If you do not already have git installed, continue
3. Run `sudo apt-get install git` to install git
4. Check that it installed correctly `git --version`
#### git config: Set up Git config files for easier interfacing with github
1. run `git config --global user.name "YourGitHubName"`
2. run `git config --global user.email "youremail@domain.com"` with the email associated with your GitHub account

### This Repository! Finally!!!
1. Now that we have everything else downloaded, we are ready to get the project files on your computer.
2. Open `Ubuntu` in Windows Terminal or open `Terminal` on Mac
3. Navigate to wherever you want to save this repository on your filesystem, you do not need to make a folder for the project, it will come in a folder labeled `concord`.
4. Run `git clone https://github.com/TBolton2000/concord.git concord`
5. Navigate into the project, `cd concord`
6. Run `nvm use` and run `nvm install` if/when prompted
7. Run `npm install` which will install all javascript packages for this project (and takes a while)
8. Finally, to test if everything is set up properly: run `npm run dev` and wait until the program fully boots up, may take a minute or two.
9. A window should have been opened in your browser at the url `http://localhost:3000/`. Once everything is started, you should be able to refresh this page and see our web application running locally.

**CONGRATS YOU'RE DONE!**

Feel free to poke around the files. A lot of the files are automatically generated boiler plate. We will write code in the /src/ directory.

---

## Typical work flow (Coding/Git guide)
1. Navigate to the `/concord` file on your computer in Terminal (Ubuntu in Windows Terminal or Terminal on Mac)
2. Run `code .` to open this folder in Visual Studio code using a Unix-style terminal.
3. Open the terminal in VS Code (toggle using <code>Ctrl+`</code> on Windows or <code>Cmd+`</code> on Mac)
4. Create a new **branch** in git by using `git checkout -b new-branch-name`. See below for more information on git.
5. Make changes to files, complete tasks.
6. Run `git status` to see what files you have made changes to.
7. Queue changes up to save to git using `git add filename` or add all using `git add .`
8. Make a commit to your local git repository using `git commit -m "Your commit message"`
9. Push your local commit to the GitHub repostiory using `git push`
10. When all the features that you are working on are done on your branch, create a Pull Request on GitHub to prepare your changes for the `master` branch. 
11. Your code will then be reviewed by other team members and if approved, your changes will present in the `master` branch. 
12. If there are some problems, just go back to that branch, make the changes, commit, and push to GitHub for code to be rereviewed.

---

## git helpful tips
- Prior to making a new branch, run `git fetch` to know about all changes from other team members from the GitHub repository to your local git repository. `git fetch` will not change any files in your local repository. In order to actually get your branches to have the changes, nagivate to that branch, `git checkout branch-name`, then run `git pull` to update your local files.
- When in doubt, `git status` out! `git status` is your best friend and will help guide you to do what you want to do.
- git can be very intimidating, but you will typically just use a few commands. If you need help, please ask!
- **Merge conflicts**: This can happen when you are trying to do a Pull Request, but there are changes that someone else has made that would conflict with your changes.


---

## Why

- **Simple** to jump into, **Fast** because it is simple.
- Separate `tsconfig.json` for client and server.
- Client and server can share code (And types). For example: [IUserDTO.d.ts](https://github.com/gilamran/fullstack-typescript/blob/master/src/shared/IUserDTO.d.ts)
- The client is bundled using [Webpack](https://webpack.github.io/) because it goes to the browser.
- The server is emitted by [TypeScript](https://github.com/Microsoft/TypeScript) because node 6 supports es6.

<p align="center"> 
<img src="https://github.com/gilamran/fullstack-typescript/raw/master/assets/images/flow.png" width="500">
</p>

---

## Requirements

- `NodeJs 12.13+`, `Chrome 79+` or `FireFox 72+`

### Directory Layout

```bash
.
├── /node_modules/                    # 3rd-party libraries and utilities
├── /dist/                            # All the generated files will go here, and will run from this folder
├── /src/                             # The source code of the application
│   ├── /client/                      # React app
│   ├── /services/                    # Express server apps hosting our different services
│   ├── /shared/                      # The shared code between the client and the server
├── /assets/                          # images, css, jsons etc.
├── .eslintrc                         # es-lint configuration
├── .prettierec                       # prettier configuration
├── .gitignore                        # ignored git files and folders
├── .nvmrc                            # Force nodejs version
├── .env                              # (ignored) Can be used to override environment variables
├── index.js                          # The server's entry point
├── package.json                      # The list of 3rd party libraries and utilities
└── tsconfig-for-webpack-config.json  # using TypeScript for the webpack config file
├── README.md                         # This file
```

### What's included

- [React v16](https://facebook.github.io/react/)
- [React router v4](https://github.com/ReactTraining/react-router)
- [Material-ui](https://github.com/mui-org/material-ui)
- [Jest](https://github.com/facebook/jest)
- [Styled Components](https://github.com/styled-components/styled-components)
- [Axios](https://github.com/mzabriskie/axios) (For Client/Server communication)

### Usage

- `npm run dev` - Client and server are in watch mode with source maps, opens [http://localhost:3000](http://localhost:3000)
- `npm run test` - Runs jest tests
- `npm run lint` - Runs es-lint
- `npm run build` - `dist` folder will include all the needed files, both client (Bundle) and server.
- `npm start` - Just runs `node ./dist/server/server.js`
- `npm start:prod` - sets `NODE_ENV` to `production` and then runs `node ./dist/server/server.js`. (Bypassing webpack proxy)

### Config

All applications require a config mechanism, for example, `SLACK_API_TOKEN`. Things that you don't want in your git history, you want a different environment to have different value (dev/staging/production). This repo uses the file `config.ts` to access all your app variables. And a `.env` file to override variable in dev environment. This file is ignored from git.
