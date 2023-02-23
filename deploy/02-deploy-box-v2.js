const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments 
    const { deployer } = await getNamedAccounts()

    log("---------------------------")

    const boxv2 = await deploy("BoxV2", {
        from: deployer,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing.....")
        await verify(boxv2.address, args) 
    }
}