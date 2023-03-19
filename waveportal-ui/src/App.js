import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json";
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
    if (!ethereum) {
      console.log("Make sure you have Metamask installed");
      return null;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Authorised account found", account);
      return account;
    } else {
      console.log("No authorised account found ");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function App() {

  const[loading,setLoading]=useState(false);

  // for setting account from metamask
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress= "0xB31b2E67BF456fD78C72558a12D86D4caa5ed729";
  const contractABI= abi.abi
  let totalWaveCount;
  /*
   * This runs our function when the page loads.
   * More technically, when the App component "mounts".
   */
  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account) {
        setCurrentAccount(account);
      }
    });
  }, []);

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get Metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        totalWaveCount = await wavePortalContract.getTotalWaves();
        console.log("Reterieved total wave counts", totalWaveCount.toNumber());

        setLoading(true);
        const waveTxn=await wavePortalContract.wave();
        console.log("Mining... ", waveTxn.hash);

        await waveTxn.wait()
        console.log("Mined...",waveTxn.hash);
        setLoading(false);

        totalWaveCount=await wavePortalContract.getTotalWaves();
        console.log("Reterieved total wave count...", totalWaveCount.toNumber());
      } else {
        console.log("Ethereum object does not exist");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
    {loading?(<div className="loader-container">
      <div className="spinner"></div>
    </div>):
      (<div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Ruksad and I worked on Domain driven design that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Do tada at me!!!
        </button>
        {totalWaveCount && <div>Total wave till now ${totalWaveCount.toNumber}</div>}

        {/*
         * If there is no currentAccount render this button
         */}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            {" "}
            Connect wallet
          </button>
        )}
      </div>)}
    </div>
  );
};
