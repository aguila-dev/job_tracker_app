# Job Finder App

This project is a very crude application for someone interested in tech and in the process of finding a job

## Dev quick start

Run these commands to get started!

1. Install Homebrew (if you don't have it installed already)

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install `nvm` (if you don't have it installed already)

```zsh
brew update
brew install nvm
mkdir ~/.nvm
nano ~/.zshrc
```

When `nano` opens, add these 2 lines to `.zshrc` and save the file:

```zsh
NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

3. Use nvm to install the latest Node 18 LTS release. Please do not use Node 20 yet.

```zsh
nvm install lts/hydrogen
# Subsitute 18.20.4 with whichever version the previous command just installed
nvm alias default 18.20.4
```

4. [Install Prettier in your editor](https://prettier.io/docs/en/editors.html) and set it up to auto-format on save. All ILS code must be formatted using Prettier.

5. Finally, install `job-board` locally

```zsh
npm install
```

6. Run correct node version

```zsh
nvm use
```

7. Run locally

```zsh
npm run dev
```

### BACKEND

Run your backend server on port 8000
Steps to get that running:

Need a GPG Key
gpg --full-generate-key
gpg --list-secret-keys --keyid-format LONG

copy from above:
go to github and add new GPG key.
name whatever you want
paste what you copied there

### TECH USED

- react frontend w/typescript
- redux toolkit for state management
- axios for api fetching

#### TODO

[] set up docker and containerization
[]
