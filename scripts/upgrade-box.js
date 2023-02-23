// Manual way
const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transaprentProxy = await ethers.getContract("Box_Proxy")

    const proxyBox = await ethers.getContractAt("Box", transaprentProxy.address)
    const version = await proxyBox.version()
    console.log('version ', version.toString())

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transaprentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transaprentProxy.address)
    const versionV2 = await proxyBoxV2.version()
    console.log('versionV2 ', versionV2.toString())

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })