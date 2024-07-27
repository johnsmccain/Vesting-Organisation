import {artifacts, ethers} from "hardhat";

async function main(){

    const amount = ethers.parseEther("13457");
    const [admin, stakeholder] =  await ethers.getSigners();

    const Token = await ethers.getContractFactory(
        "Token"
    )
    const token = await Token.deploy(
        "Guild Audit", 
        "GAT", 
        amount
    );
    const tokenAddress =  await token.getAddress();

    
    const GAOrganization = await ethers.getContractFactory(
        "GAOrganization"
    );
    const gaorganization = await GAOrganization.deploy(
        admin.address, 
        tokenAddress
    );
    const gaorganizationAddress =  await gaorganization.getAddress();
    
    saveToFrontend("Token", tokenAddress);
    saveToFrontend("GAOrganization", gaorganizationAddress);
} 

async function saveToFrontend(name:string, address:any){

    const fs = require("fs");
    // const {exec} = require("child_process");

    // exec(`rm -r ${__dirname}/../../frontend/contractsData`)

    const contractDir = `${__dirname}/../../frontend/contractsData`;

    if (!fs.existsSync(contractDir)){
        fs.mkdirSync(contractDir);
    }

    fs.writeFileSync(
        `${contractDir}/${name}-address.json`, 
        JSON.stringify(
            {address: `${address}`}, 
            undefined, 
            2
        )
    );

    const contractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(
        `${contractDir}/${name}.json`, 
        JSON.stringify(
            contractArtifact, 
            null, 
            2
        )
    )
}

main().then(() => 
    process.exit(0)
).catch(()=> 
    process.exit(1)
);