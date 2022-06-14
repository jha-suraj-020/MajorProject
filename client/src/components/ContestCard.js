import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style/ContestCard.css'


function ContestCard({item}) {
  const history = useNavigate();
  
  const handleClick = () => {
    history(`/contest/${item.atAddress}`)
  }

  return (
    <Card className='mb-3'>
      <Card.Header>at: {item.atAddress}</Card.Header>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Button variant="info" onClick={handleClick}>Enter</Button>
      </Card.Body>
    </Card>
  )
}

export default ContestCard