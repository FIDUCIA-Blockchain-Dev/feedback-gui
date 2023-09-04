import React, { Component } from 'react';
import Web3 from 'web3';
import Chairperson from './chairperson/chairperson.js';
import Normal from './normal/normal.js';
import {ABI,address} from './config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      status:-1,
      
      
    };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    try {
      // Check if Web3 provider is available from Metamask or similar extension
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission to connect
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const scontract = new web3.eth.Contract(ABI,address);
        this.setState({scontract},()=>{
            this.chairperson_or_normal();
        });
        
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }

  async chairperson_or_normal() 
  {
    const {scontract,account} = this.state;
    const chair = await scontract.methods.chairperson().call();
    if(chair==account)
    {
        this.setState({status:1})
    }
    else
    {
        this.setState({status:0})
    }


  }
 
  render() {
    const {status} = this.state;
    
    return (
     
   
    <>
    {status==1 && <Chairperson/>}
    {status==0 && <Normal/>}
    </>
    );
  }
}

export default App;