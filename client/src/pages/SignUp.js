import {Form, Navbar, Container, Button} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateContest() {
    useEffect(() => {
        setloader(false)
    }, []);

    const [loader, setloader] = useState(true);

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [addr,setAddr] = useState('');

    const history = useNavigate();
    const param = useParams();

    const baseURL = `http://localhost:3001/user/create`

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, email, addr)
        
        setloader(true);
        const response = await axios.post(baseURL, {
            username: username,
            email: email,
            address: addr
        })
        setloader(false);

        console.log(response)

        if(response.status == 201){
            history(`/contest`)
        }
        else{
            alert("error occured")
        }
    }

    if (loader) {
        return <div>loading ..</div>;
    }
    return (
        <div className="signup">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">PublicX</Navbar.Brand>
            <p style={{color: "white", marginTop: "auto", marginBottom: "auto", marginLeft: "auto"}}>Login</p>
          </Container>
        </Navbar>
        
        <Container>
            <p className='display-6 mt-5'>SIGN UP</p>
            <hr></hr>

            <Form onSubmit={handleSubmit} className="mt-5">
            <Form.Group className="mb-3" >
                <Form.Label>Userame:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Public Address:</Form.Label>
                <Form.Control type="text" onChange={e => setAddr(e.target.value)} placeholder="Enter your public address" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
                Register
            </Button>
            </Form>

        </Container>
        </div>
    )
}

export default CreateContest