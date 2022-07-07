import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import '../style/ContestDetails.css'
import Web3 from 'web3'
import Contestabi from '../contracts/Contest.json'
import Header from '../components/Header';
import CandidateCard from '../components/CandidateCard';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function ContestDetails() {
  useEffect(() => {
      loadWeb3();
      LoadBlockchaindata();
  }, []);

  const [Currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [Contestsm, SetContestsm] = useState();
  const [candidates, setCandidates] = useState([]);

  const [name, SetName] = useState();
  const [desc, SetDesc] = useState();
  const [noOfCandidates, SetNoOfCandidates] = useState();
  const [prizeAmount, SetPrizeAmount] = useState();
  const [completed, SetCompleted] = useState();
  const [active, SetActive] = useState();
  const [manager, SetManager] = useState();
  const [votersCount, SetVotersCount] = useState();

  const [winner, SetWinner] = useState();

  const param = useParams();

  const history = useNavigate();

  const baseURL = `http://localhost:3001/certificate/${param.id}`

  const handleClick = (e)=>{
    history(`/contest/${param.id}/create`)
  }

  const handleActivate = async (e)=>{
      await Contestsm.methods
        .activateContest()
        .send({ from: Currentaccount })
        .on("transactionhash", () => {
            console.log("contest activated succesfully.");
        });

      window.location.reload();
  }

  const handleFinalize = async (e)=>{
    await Contestsm.methods
      .finalizeRequest()
      .send({ from: Currentaccount })
      .on("transactionhash", () => {
          console.log("contest finalized succesfully.");
      });

    window.location.reload();
  }

  const handleCertify = async (e)=>{
    const response = await axios.post(baseURL, {
      name: candidates[winner].name,
      addr: candidates[winner].recipient,
      contestName: name
    })

    console.log(response)
    alert("Certificated generated...")
  }

  const handleViewCertificate = async (e)=>{
    const response = await axios.get(baseURL)
    console.log(response.data.data.data)

    const arr = new Uint8Array(response.data.data.data);

    const file = new Blob(
      [arr], 
      {type: 'application/pdf'});

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL);
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

    console.log(param.id)

    const contest = new web3.eth.Contract(
      Contestabi.abi,
      param.id
    );
    
    // const contestSummary = await contest.methods.getSummary().call();
    // console.log(contestSummary)

    SetName(await contest.methods.name().call())
    SetDesc(await contest.methods.desc().call())
    SetNoOfCandidates(await contest.methods.noOfCandidates().call())
    SetPrizeAmount(await contest.methods.prizeAmount().call())
    SetCompleted(await contest.methods.completed().call())
    SetActive(await contest.methods.active().call())
    SetVotersCount(await contest.methods.votersCount().call())
    SetManager(await contest.methods.manager().call())
    SetWinner(await contest.methods.winner().call())
    
    const _candidates = await contest.methods.getCandidates().call();
    console.log(_candidates)
    setCandidates(_candidates)

    SetContestsm(contest);
    setloader(false);
  };
    
  return (
    <div className='contest-details'>
      <Header CurrentAccount={Currentaccount}/>

      <div className='box'>
          <Row className='mb-5'>
            <Col xs={11} className="mb-3">
              <h1 className='display-5 ml-2'>{name}</h1>
              <hr></hr>
            </Col>
            <Col xs={9} className='bg-light'>
              <br></br>
              <p className="lead"> <b>About: </b>{desc}</p>
              <p className="lead"> <b>Manager: </b>{manager}</p>
              <p className="lead"> <b>Number Of Candidates: </b>{noOfCandidates}</p>
              <p className="lead"> <b>Prize Money: </b>{prizeAmount/Math.pow(10,18)} ether</p>
              <p className="lead"> <b>No of voters voted till now: </b>{votersCount}</p>

              <p className="lead"> <b>Active: </b>{active ? <span> Yes</span> : <span> No</span> }</p>
              <p className="lead"> <b>Completed: </b>{completed ? <span> Yes</span> : <span> No</span> }</p>
              <br></br>
            </Col>
            <Col xs={3}>
              <br></br>
              { Currentaccount == manager &&
                <div>
                  <Button className='d-block mb-3' onClick={handleClick}>Create Candidate</Button>
                  <Button className='d-block mb-3' onClick={handleActivate}>Activate</Button>
                  <Button className='d-block mb-3' onClick={handleFinalize}>Finalize</Button>
                  <Button className='d-block mb-3' onClick={handleCertify}>Certify</Button>
                </div>
              }
              
              { completed &&
                <Button className='d-block' onClick={handleViewCertificate}>View Certificate</Button>
              }
            </Col>
          </Row>

          <Row>
            <Col xs={11}>
              <p className='display-6 ml-2'>CANDIDATES</p>
              <hr></hr>
            </Col>
          </Row>

          <div>
            {candidates.map(item => <CandidateCard key={item} item={item} Contestsm={Contestsm} Currentaccount={Currentaccount} completed={completed} winner={winner}/>)}
          </div>
        </div>
    </div>
  )
}

export default ContestDetails