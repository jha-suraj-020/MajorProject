import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style/ContestCard.css'

function ContestCard({item, Contestsm, Currentaccount}) {
  const history = useNavigate();
  
  const handleClick = async () => {
        await Contestsm.methods
        .vote(Number(item.index))
        .send({ from: Currentaccount })
        .on("transactionhash", () => {
            console.log("voted succesfully.");
        });

        window.location.reload();
  }

  return (
    <Card style={{ width: '18rem' }}  className='d-inline-block m-2'>
        <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{item.recipient}</Card.Subtitle>
        <Card.Text>
            <b>About: </b> {item.description} <br></br>
            <b>Votes: </b> {item.voteCount}
        </Card.Text>
        <Button variant="info" onClick={handleClick}>Vote</Button>
        </Card.Body>
    </Card>
  )
}

export default ContestCard