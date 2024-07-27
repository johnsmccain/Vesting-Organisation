// src/components/Withdraw.js
// import { useState } from 'react';
import { ethers } from 'ethers';

import Vesting from '../../contractsData/GAOrganization.json';
import VestingAddress from "../../contractsData/GAOrganization-address.json";
// import Token from "../../contractsData/Token.json";
// import TokenAddress from "../../contractsData/Token-address.json";


const Withdraw = ({signer}:any) => {
    const vestingAddress = VestingAddress.address;
    // const tokenAddress = TokenAddress.address;
    
 
      
    const withdrawTokens = async () => { 
        try {
            // const [] = await sign
            // const token = new ethers.Contract(tokenAddress, Token.abi, signer);
            const vestingContract = new ethers.Contract(vestingAddress, Vesting.abi, signer);
            // const stake_holder = await vestingContract.stake_holders(signer.address);
            // const amount = await stake_holder?.amount
            // // ethers.formatEther(amount)
            // console.log(ethers.formatEther(amount))
            // await token.approve(vestingAddress, amount)
            await vestingContract.withdraw();
            // vestingContract.on("LogEvent", ( stake_holder, amount)=>{
            //     console.log(stake_holder, amount);
            //   })
            alert("Tokens withdrawn!");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex items-center flex-col">
            <h2 className='text-xl font-bold'>Withdraw Tokens</h2>
            <button className='hover:shadow-lg font-semibold shadow-sm w-fit px-5 py-2 rounded-md mt-7' onClick={withdrawTokens}>Withdraw</button>
        </div>
    );
};

export default Withdraw;
