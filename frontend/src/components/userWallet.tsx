// src/components/ConnectWallet.js
// import { useState } from 'react';
// import { ethers } from 'ethers';

// import Vesting from '../../contractsData/GAOrganization.json';
// import VestingAddress from "../../contractsData/GAOrganization-address.json";

const ConnectWallet = ({connectWallet, walletAddress, balanceOf}:any) => {
    // const [walletAddress, setWalletAddress] = useState("");
    // const vestingAddress = VestingAddress.address;

    return (
        <div className=' '>
            {
                walletAddress?
                <>
                    <button className='rounded p-3 border'> {`${walletAddress && balanceOf}`} GAT</button> 
                    <button className='rounded p-3 border'> {`${walletAddress.slice(0,6)}..${walletAddress.slice(-4)}`}</button>
                </>:
                <button className='w-fit p-3 border rounded' onClick={connectWallet}>Connect Wallet</button>
            }
        </div>
    );
};

export default ConnectWallet;
