const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments 
    const { deployer } = await getNamedAccounts()

    log("---------------------------")

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        waitConfirmations: network.config.blockConfirmation || 1,
        log: true,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin"
            }
        }
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifing.....")
        await verify(box.address, args) 
    }
}