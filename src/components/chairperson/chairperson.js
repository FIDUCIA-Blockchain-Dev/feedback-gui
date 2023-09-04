import React, { Component } from 'react';
import Web3 from 'web3';
import Start from './start.js';
import Reset from './reset.js';
import GetAnswers from './getAnswers.js';
import Questions from './questions_input.js';
import {ABI,address} from '../config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      component:'',
      
      
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
        this.setState({scontract});
        
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }
async start() 
{
  this.setState({component:'start'})
}
async reset() 
{
  this.setState({component:'reset'})
}
async questions() 
{
  this.setState({component:'questions'})
}
async getAnswers() 
{
  this.setState({component:'getAnswers'})
}
 
 
  render() {
    const {component} = this.state;
    
    return (
      <>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">FIDUCIA</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" onClick={()=>this.start()} href='#'>Start</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" onClick={()=>this.reset()} href='#'>Reset</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" onClick={()=>this.questions()} href='#'>See Feedback</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" onClick={()=>this.getAnswers()} href='#'>Enter Questions</a>
        </li>
      
      
      </ul>
     
    </div>
  </div>
</nav>
{component=='start' && <Start/>}
{component=='reset' && <Reset/>}
{component=='getAnswers' && <GetAnswers/>}
{component=='questions' && <Questions/>}
    </>
    
    );
  }
}

export default App;