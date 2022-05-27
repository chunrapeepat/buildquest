# BuildQuest
> L2 Rollation Hackathon Submission: Boba Network Bounty 

![BuildQuest](https://i.ibb.co/xS2SFrt/Clean-Shot-2565-05-23-at-03-45-29-2x.png)
BuildQuest is a grants and bounties platform for Web3 builders. In this alpha version, we've built a bounty disbursement automation tool that automatically pays out when the contributor's pull request gets merged.

> Try it yourself: https://buildquest.xyz, Follow Our Twitter: [@buildquestxyz](https://twitter.com/buildquestxyz)

### Why BuildQuest?
I started this project with a personal belief that "developers will produce 10x quality works if they work on the thing they love". I think the future of work should be more like doing side projects where you doing what you consider meaningful and getting earned while maintaining full ownership.

In the past years, we started to see this kind of work are getting more and more popular, we started to see developers shift to Web3, we started to see more full-time indie hackers, bounty hunters, and open-source contributors, and the numbers keep going.

That's why I wanted to build & experiment around grants & bounties tooling that helps support this kind of builder to build and iterate ideas much more faster and more efficiently.

I also planned to ship more features soon (see the Roadmap section below), and I want to continue building until we reach our mission that "our product can support builders to earn money by contributing to the project they love".

### Roadmap & future development
There are 2 aspects that we would like to focus on to achieve our mission.

**1. Grant/Bounty as a service (GBaaS) for Web3 protocols** - Building tools that help Web3 protocols manage grants and bounties much more efficiently and improve the user experience for builders.
  - Features: Grant Analytics Dashboard, Developer Relationship Management, Application Management, Report, Disbursement Tooling, Onboarding Process for upcoming Web3 protocols, etc...
  - How boba can help us reach our mission: provide support for developing an MVP, collaborate and partner together to bring the best user experience for builders and Web3 protocols.

**2. Community-based platform** - Focusing on builders community. (think of Linkedin for Web3 builders)
  - Features: builders reputation, social networking, discovery layer for BUIDL opportunities.
  - How boba can help us reach our mission: introduce our product to Boba ecosystem to bootstrap an initial network.

**3. Web2** - Scaling our tooling to Web2 tech company since we think that there's some type of company and some type of work that is applicable with this model e.g. company that sells an API, a company that sells plugins/template, etc... 

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
This is my first time writing a smart contract in Solidity and using Truffle for deployment. Love it!

---

Crafted with 🧡 by [@chunza2542](https://twitter.com/chunza2542)
