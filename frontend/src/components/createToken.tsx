// src/components/Admin.js
import { useState } from 'react';
import { ethers } from 'ethers';

import Vesting from '../../contractsData/GAOrganization.json';
import VestingAddress from "../../contractsData/GAOrganization-address.json";


export default () => {
    
    const [symbol, setSymbol] = useState("");
    const [name, setName] = useState("");
    const [releaseTime, setReleaseTime] = useState(0);
    const [amount, setAmount] = useState(0);
    const [signer, setSigner] = useState();
    const [provider, setProvider] = useState<any>()
    const vestingAddress = VestingAddress.address;

    const mintToken = async () => {
        if (window.ethereum == null) {

            alert("Please install MetaMask!");
            const provide = ethers.getDefaultProvider();
            setProvider(provide);
        } else {

            
            const provide = new ethers.BrowserProvider(window.ethereum);
            setProvider(provide);
            const sign = provider.getSigner();
            setSigner(sign);
            const vestingContract = new ethers.Contract(vestingAddress, Vesting.abi, signer);
            // ethers.utils.parseUnits(amount.toString(), 18)
            await vestingContract.addStakeholder(stakeholder, ethers.parseEther(amount.toString()), releaseTime);
            alert("Stakeholder added!");
        }
    };

    return (
        <div className='flex flex-col w-96 my-3 mx-auto'>
            <h2 className='my-2 text-center'>Create A token</h2>
            <input className='my-1 p-2 rounded shadow hover:shadow-md' type="text" placeholder="Token Name" onChange={e => setName(e.target.value)} />
            <input className='my-1 p-2 rounded shadow hover:shadow-md' type="text" placeholder="Token Symbol" onChange={e => setSymbol(e.target.value)} />
            <input className='my-1 p-2 rounded shadow hover:shadow-md' type="number" placeholder="Amount" onChange={e => setAmount(Number(e.target.value))} />
            <button className='my-1 p-2 rounded shadow hover:shadow-md ' onClick={mintToken}>Mint Token</button>
        </div>
    );
};

