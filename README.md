# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

1. To create new hardhat project use this ``npx hardhat``. Which creates file ``hardhat.config.js``
2. File scripts/run.js is run by hardhat to create temporary ethereum blockchain network on your local and deploys it.``npx hardhat run scripts/run.js``
3. API ``hre.ethers.getSigners();`` returns an array in which 0th is the owner.
4. To run ethereum node from hardhat use command ``npx hardhat node`` it gives 20 wallets with 10000 eth each 
5. Deploy you contract on this localhost node using command ``npx hardhat run scripts/deploy.js --network localhost``

# Now to deploy this contract on testnet blockchain we need to

1. Get Api key for a testnet from quicknote
2. we do not do deployment on hardhat local node 
3. Quicknote helps us to deploy contract on main blockchain or test netwok
4. use dependency ``npm install --save dotenv`` to save your private key and quicknote goerli secret url into .env file and add it to .gitignore
5. deploy the contract on goerli test network using command``npx hardhat run scripts/deploy.js --network goerli``
6. Deployed contract is on https://goerli.etherscan.io/address/0xa7FD41dED077bD03EEaFe36Deb7f2ECE090bB180
7. You can get goeli from here https://goerlifaucet.com/
8. you can test your contract with hardhar run.js ``npx hardhat run scripts/run.js`` it automatically creates blockchain and deploy your contract on it

# To make reactjs app communicate with deployed contract
1. Before deploying contract one needs to have metamask extension installed with wallet created
2. Now App.js file will read metamask injected  ethereum object into window
3. ``eth_accounts`` will retrun all the accounts within a wallet, now out reactjs app should be allowed to use that account form wallet.
4. But to connect to metamask and ask for permission form metamask one need to use ``eth_requestAccounts`` 

# Deployment of application on git-hub pages
1. Add below lines in package.json file 
        1.a  "homepage": "https://ruksad.github.io/Wave-portal"
        1.b ``"predeploy": "npm run build",deploy": "gh-pages -d build" `` in package.json under scripts 
2. Do ``npm install --save gh-pages`` and run ``npm run deploy`` this command will create gh-pages in your git hub repo. Now go to settings->Pages-> you willl be able to see deployed website on github