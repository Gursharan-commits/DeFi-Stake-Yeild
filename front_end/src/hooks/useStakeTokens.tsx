import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const useStakeTokens = (tokenAddress: string) => {
    //address
    //abi
    //chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    //const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)


    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    //approve
    //stake token
    const { send: approveErc20Send, state: approvceErc20State } = useContractFunction(erc20Contract, "approve", { transactionName: "Approve ERC20 transfer" })

    const approve = (amount: String) => {
        return approveErc20Send(tokenFarmAddress, amount)
    }

    const [state, setState] = useState(approvceErc20State)
    return { approve, state }

}