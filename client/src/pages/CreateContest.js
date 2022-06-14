import {Form, Container, Button} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Electionabi from "../contracts/ContestFactory.json";
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

function CreateContest() {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  const [Currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [Electionsm, SetElectionsm] = useState();

  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [noCandidates,setNoCandidates] = useState('');
  const [prizeAmount,setPrizeAmount] = useState('');

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, description, noCandidates)
    
    setloader(true);
    await Electionsm.methods
      .createContest(name, description, Number(noCandidates))
      .send({ from: Currentaccount, value: window.web3.utils.toWei(prizeAmount, 'ether') })
      .on("transactionhash", () => {
        console.log("contest created succesfully.");
      });
    setloader(false);

    history('/contest')
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
      
      SetElectionsm(election);
      setloader(false);
    } else {
      window.alert("the smart contract is not deployed current network");
    }
  };

  if (loader) {
    return <div>loading ..</div>;
  }
  return (
    <div className="createContest">
      <Header CurrentAccount={Currentaccount}/>
      
      <Container>
        <p className='display-6 mt-5'>CREATE A CONTEST</p>
        <hr></hr>

        <Form onSubmit={handleSubmit} className="mt-5">
          <Form.Group className="mb-3" >
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" onChange={e => setName(e.target.value)} placeholder="Enter name for contest" />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" onChange={e => setDescription(e.target.value)} placeholder="Enter description for contest" />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Candidtaes Count:</Form.Label>
            <Form.Control type="text" onChange={e => setNoCandidates(e.target.value)} placeholder="Enter No of Candidates" />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Prize money for Contest:</Form.Label>
            <Form.Control type="text" onChange={e => setPrizeAmount(e.target.value)} placeholder="Enter prize amount in ether" />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-3'>
            Create Contest
          </Button>
        </Form>

      </Container>
    </div>
  )
}

export default CreateContest