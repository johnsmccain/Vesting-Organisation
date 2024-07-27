import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Admin from './components/admin';
import Withdraw from './components/withdraw';
import Token from "../contractsData/Token.json";
import CreateToken from './components/createToken';
import ConnectWallet from './components/userWallet';
import TokenAddress from "../contractsData/Token-address.json";

function App() {  
  const tokenAddress = TokenAddress.address;
  const [signer, setSigner] = useState();

  const [walletAddress, setWalletAddress] = useState("");
  const [balanceOf, setBalanceOf] = useState();

  
  const connectWallet = async () => {
    if (window?.ethereum == null) {
          ethers.getDefaultProvider();
          alert("Please install MetaMask!");
        } else {
            const provide = new ethers.BrowserProvider(window.ethereum);
            const sign = await provide.getSigner();
            setSigner(sign as any);
            setWalletAddress(sign.address);
            const token = new ethers.Contract(tokenAddress, Token.abi, sign);
            const balance = await token.balanceOf(sign.address);
            setBalanceOf(ethers.formatEther(balance) as any);
        }
    };
   
    useEffect(() => {
      connectWallet();
    }, [])
    console.log(balanceOf)

  return (
    <>
      
        <nav className="p-5 flex justify-between">
          <div className="flex gap-5 items-center">
            <Link to={"/"}>Home</Link>
            <Link to={"/admin"}>Admin</Link>
            <Link to={"/withdraw"}>Withdraw</Link>
          </div>
          <ConnectWallet  connectWallet={connectWallet} walletAddress={walletAddress} balanceOf={balanceOf}/>
        </nav>
        <main className="p-5 ">
          <Routes>
            <Route path="/" element={<CreateToken />}/>
            <Route path="/admin" element={<Admin signer={signer}/>}/>
            <Route path="withdraw" element={<Withdraw signer={signer}/>}/>
          </Routes>
        </main>
     
    </>
  )
}


        




export default App
