import React from 'react'
import {truncate} from '../utils/utils'


function ConnectBtn({connected, currentAccount, connectWallet}) {
  return (
    <>
        {connected ? <button> {truncate(currentAccount)} </button>  : <button onClick={connectWallet} >CONNECT WALLET</button>}
    </>
  )
}

export default ConnectBtn