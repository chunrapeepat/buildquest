# BuildQuest
> L2 Rollation Hackathon Submission: Boba Network Bounty 

![BuildQuest](https://i.ibb.co/xS2SFrt/Clean-Shot-2565-05-23-at-03-45-29-2x.png)
BuildQuest is a grants and bounties platform for Web3 builders. In this alpha version, we've built a bounty disbursement automation tool that automatically pays out when the contributor's pull request gets merged.

> Try it yourself: https://buildquest.xyz, Follow Our Twitter: [@buildquestxyz](https://twitter.com/buildquestxyz)

### Why BuildQuest?
I started this project with a personal belief that "developers will produce 10x quality works if they work on the thing they love". I think the future of work should be more like doing side projects where you doing what you consider meaningful and getting earned while maintaining full ownership.

In the past years, we started to see this kind of work are getting more and more popular, we started to see developers shift to Web3, we started to see more full-time indie hackers and open-source contributors, and the numbers keep going.

That's why we wanted to build & experiment around grants & bounties tooling that helps support this kind of builder to build and iterate ideas much more efficiently.

We also planned to ship more features soon (see the Roadmap section below), and we want to continue building this project until we reach the point that "our product can support builders to earn enough for a decent living by contributing to the project they love".

### Roadmap & future development
There are 2 aspects that we would like to focus on to achieve our mission.

**1. Grant/Bounty as a service (GBaaS) for Web3 protocols** - We wanted to build tooling that helps Web3 protocols manage grants and bounties much more efficiently e.g. Analytics Tooling, Developer Management, Grant application management, Disbursement Tooling, etc...
  - How boba can help us reach our mission: provide support for developing an MVP, and collaborate and partner together to build the best grant and bounty tooling.

**2. Community-based platform** - A place where builders share ideas, get inspired, and collaborate together. You can think of Linkedin for Web3 builders.
  - How boba can help us reach our mission: introduce our product to Boba ecosystem to bootstrap an initial network.

## Technology
### How it works?
![How it works](https://i.ibb.co/LnfxHn5/Clean-Shot-2565-05-23-at-04-19-53-2x.png)
### Setting up project
1. Clone this repository
```sh
git clone git@github.com:chunza2542/buildquest.app.git
```
3. Install dependencies
```sh
yarn # or npm install
```
3. Setup your firebase project
4. Setup frontend environment variables
```
cd packages/react-app && cp .env.example .env && vim .env
```
5. Start react-app (frontend)
```
yarn react-app:start
```
6. That's it

### Tech stack
- Frontend: Firebase Auth/Hosting, React, Ethers.js, RainbowKit
- Backend: Firebase Cloud Functions, Firestore
- Blockchain: Truffle, Solidity

### What I learn from this hackathon 
This is my first time writing a smart contract in Solidity and using Truffle for deployment. I started this project 2 days before the submission deadline so it is quite challenging here but It's really enjoyable to learn.

---

Crafted with 🧡 by [@chunza2542](https://twitter.com/chunza2542)
