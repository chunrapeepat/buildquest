# BuildQuest
> L2 Rollation Hackathon Submission: Boba Network Bounty 

![BuildQuest](https://i.ibb.co/xS2SFrt/Clean-Shot-2565-05-23-at-03-45-29-2x.png)
BuildQuest is a grants and bounties platform for Web3 builders. In this alpha version, we've built a bounty disbursement automation tool that automatically pays out when the contributor's PR gets merged.

> Try it yourself: https://buildquest.xyz, Follow Our Twitter: [@buildquestxyz](https://twitter.com/buildquestxyz)

### Why BuildQuest?

### Features
## Technology
### How it works?
1. User connect their wallet to give a public address to the site
2. Frontend send that public address to get a challenge code (nonce) from the backend
3. Frontend give the challenge code to the wallet to sign a message with PK 🔑
4. Frontend submit that signed message to the backend
5. Backend received the message, proof validity, and generate a new JWT custom token to frontend
6. Frontend use that token to sign in (using Firebase Custom Authentication)
7. Now the user can comment, like, and reply on the web 😎

### Setting up project
1. Clone this repository
```sh
git clone git@github.com:chunza2542/ethtalk.app.git
```
3. Install dependencies
```sh
yarn # or npm install
```
3. Setup your firebase project
4. Start firebase-api (backend)
```
yarn firebase-api:start
```
5. Setup frontend environment variables
```
cd packages/react-app && cp .env.example .env && vim .env
```
6. Start react-app (frontend)
```
yarn react-app:start
```
7. Experiment and develop your AWESOME 😎 features

### Tech stack
- Frontend: Firebase, React, 
- Backend: Firebase Cloud Functions, Firestore, Firebase Github Authentication

### What I learn from this project 

---

Crafted with 🧡 by [@chunza2542](https://twitter.com/chunza2542)
