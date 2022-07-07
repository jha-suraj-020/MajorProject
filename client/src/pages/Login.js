import {Form, Navbar, Container, Button} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateContest() {
    useEffect(() => {
        setloader(false)
    }, []);

    const [loader, setloader] = useState(true);

    const [email,setEmail] = useState('');
    const [addr,setAddr] = useState('');

    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, addr)
        
        setloader(true);
        const response = await axios.get(`http://localhost:3001/user/${addr}`)
        setloader(false);

        console.log(response)

        if(response.status == 200){
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
            <p className='display-6 mt-5'>LOG IN</p>
            <hr></hr>

            <Form onSubmit={handleSubmit} className="mt-5">
            <Form.Group className="mb-3" >
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Public Address:</Form.Label>
                <Form.Control type="text" onChange={e => setAddr(e.target.value)} placeholder="Enter your public address" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
                Log In
            </Button>
            </Form>

        </Container>
        </div>
    )
}

export default CreateContest