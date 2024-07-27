// src/components/Admin.js
import { useState } from 'react';
import { ethers } from 'ethers';

import Token from "../../contractsData/Token.json";
import Vesting from '../../contractsData/GAOrganization.json';
import TokenAddress from "../../contractsData/Token-address.json";
import VestingAddress from "../../contractsData/GAOrganization-address.json";

const Admin = ({signer}:any) => {
    
    const [stakeholder, setStakeholder] = useState("");
    const [amount, setAmount] = useState(0);
    const [releaseTime, setReleaseTime] = useState(0);
    const vestingAddress = VestingAddress.address;
    const tokenAddress = TokenAddress.address;

    const addStakeholder = async () => {
        const vestingContract = new ethers.Contract(vestingAddress, Vesting.abi, signer);
        const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);

        // ethers.utils.parseUnits(amount.toString(), 18)
        await vestingContract.addStakeHolder(stakeholder, ethers.parseEther(amount.toString()), releaseTime);
        await tokenContract.approve(vestingAddress, ethers.parseEther(amount.toString()));
        alert("Stakeholder added!");
    };

    return (
        <div className='flex flex-col w-96 my-3 mx-auto'>
            <h2 className='my-2 text-center'>Admin Panel</h2>
            {/* <input className='my-1 p-2 rounded shadow hover:shadow-md' type="text" placeholder="Token Address" onChange={e => setTokenAddress(e.target.value)} /> */}
            <input className='my-1 p-2 rounded shadow hover:shadow-md' type="text" placeholder="Stakeholder Address" onChange={e => setStakeholder(e.target.value)} />
            <input className='my-1 p-2 rounded shadow hover:shadow-md' type="number" placeholder="Amount" onChange={e => setAmount(Number(e.target.value))} />
            <input className='my-1 p-2 rounded shadow hover:shadow-md' type="number" placeholder="Release Time (timestamp)" onChange={e => setReleaseTime(Number(e.target.value))} />
            <button className='my-1 p-2 rounded shadow hover:shadow-md ' onClick={addStakeholder}>Add Stakeholder</button>
        </div>
    );
};

export default Admin;
