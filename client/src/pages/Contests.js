import { Button, Row, Col, Alert } from 'react-bootstrap'
import ContestCard from '../components/ContestCard'
import Header from '../components/Header'
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Electionabi from "../contracts/ContestFactory.json";
import { useNavigate } from 'react-router-dom';
import '../style/Contest.css'

function Contest() {
    useEffect(() => {
        loadWeb3();
        LoadBlockchaindata();
      }, []);
    
      const [Currentaccount, setCurrentaccount] = useState("");
      const [loader, setloader] = useState(true);
      const [Electionsm, SetElectionsm] = useState();
      const [contests, setContests] = useState();

      const history = useNavigate();

      const handleClick = (e)=>{
        history('/create')
      }
    
      const loadWeb3 = async () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }
      };
    
      const LoadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
    
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
    
        const networkData = Electionabi.networks[networkId];
    
        if (networkData) {
          const election = new web3.eth.Contract(
            Electionabi.abi,
            networkData.address
          );
          
          const deployedContests = await election.methods.getDeployedContests().call();
          console.log(deployedContests)
          
          SetElectionsm(election);
          setContests(deployedContests);
          setloader(false);
        } else {
          window.alert("the smart contract is not deployed current network");
        }
      };

    if (loader) {
        return <div>loading ..</div>;
      }

    return (
      <>
        <Header CurrentAccount={Currentaccount}/>
        
        <div className='box'>
          <Row>
            <Col xs={11} className="mb-3">
              <p className='display-6 ml-2'>CONTESTS</p>
              <hr></hr>
            </Col>
            {contests.length == 0 && 
              <Alert variant="danger">
                There are no contests to list.
              </Alert>
            }
            <Col xs={9}>
              <div className='list-card'>
                {contests.map(item => <ContestCard key={item} item={item}/>)}
              </div>
            </Col>
            <Col>
              <Button onClick={handleClick}>Create Contest</Button>
            </Col>
          </Row>
        </div>
    </>
    )
}

export default Contest