import {Form, Container, Button} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Contestabi from "../contracts/Contest.json";
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom';

function CreateContest() {
    useEffect(() => {
        loadWeb3();
        LoadBlockchaindata();
    }, []);

    const [Currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [Contestsm, SetContestsm] = useState();

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [recipient,setRecipient] = useState('');
    const [contestName, setContestName] = useState('');

    const history = useNavigate();
    const param = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, description, recipient)
        
        setloader(true);
        await Contestsm.methods
        .createCandidate(name, description, recipient)
        .send({ from: Currentaccount })
        .on("transactionhash", () => {
            console.log("contest created succesfully.");
        });
        setloader(false);

        history(`/contest/${param.id}`)
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
        
        const contestSummary = await contest.methods.getSummary().call();
        console.log(contestSummary)

        setContestName(await contest.methods.name().call())
        
        SetContestsm(contest);
        setloader(false);
    };

    if (loader) {
        return <div>loading ..</div>;
    }
    return (
        <div className="createContest">
        <Header CurrentAccount={Currentaccount}/>
        
        <Container>
            <p className='display-6 mt-5'>ADD CANDIDATE TO {contestName}</p>
            <hr></hr>

            <Form onSubmit={handleSubmit} className="mt-5">
            <Form.Group className="mb-3" >
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" onChange={e => setName(e.target.value)} placeholder="Enter name of candidate" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" onChange={e => setDescription(e.target.value)} placeholder="Enter description for ccandidate" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Candidate Public Address:</Form.Label>
                <Form.Control type="text" onChange={e => setRecipient(e.target.value)} placeholder="Enter Candidate's public address" />
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