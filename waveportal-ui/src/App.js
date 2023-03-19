import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
/**
 *
 * @returns metamask plugin injects ethereum object into window
 */
const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
    if(!ethereum){
      console.log("Make sure you have Metamask installed");
      return null;
    }

    const accounts=   await ethereum.request({method:"eth_accounts"});
    if(accounts.length!==0){
      const account= accounts[0];
      console.log("Authorised account found", account);
      return account;

    }else{
      console.log("No authorised account found ");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function App() {

  const [currentAccount, setCurrentAccount]=useState("");


  /*
   * This runs our function when the page loads.
   * More technically, when the App component "mounts".
   */
  useEffect(() => {
   findMetaMaskAccount().then((account)=>{
      if(account){
        setCurrentAccount(account);
      }
   });
  }, []);

  const wave = () => {};
  const connectWallet= async()=>{
    try{
      const ethereum= getEthereumObject();
      if(!ethereum){
        alert("Get Metamask");
        return;
      }
      const accounts= await ethereum.request({method:"eth_requestAccounts"});
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Ruksad and I worked on Domain driven design that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Do tada at me
        </button>

        {/*
         * If there is no currentAccount render this button
         */}

        { !currentAccount &&(
          <button className="waveButton" onClick={connectWallet}> Connect wallet</button>
        )

        }
      </div>
    </div>
  );
}
