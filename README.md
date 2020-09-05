# concord

---

## Quick Start

Howdy everyone! Welcome to the new *concord* (name still pending) repository!

Here is a walkthrough of all of the tools that you will need and how to install all of them.

Windows Only:
1. WSL
2. Ubuntu for WSL
3. Windows Terminal (optional, but a very good terminal)

All:
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

```bash
git clone https://github.com/gilamran/fullstack-typescript.git <MyProjectName>
cd <MyProjectName>
npm install
npm run dev
```

If you want to detach from this repository into your own repository do this:

```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
git push -u origin master
```

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
│   ├── /server/                      # Express server app
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

---

#### What's not included

- Universal (Server side rendering)
- Redux/MobX (State management)

---

#### Licence

This code is released as is, under MIT licence. Feel free to use it for free for both commercial and private projects. No warranty provided.
