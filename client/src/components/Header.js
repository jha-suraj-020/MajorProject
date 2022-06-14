import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header({ CurrentAccount }) {
    return (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">PublicX</Navbar.Brand>
            <p style={{color: "white", marginTop: "auto", marginBottom: "auto", marginLeft: "auto"}}>{CurrentAccount}</p>
          </Container>
        </Navbar>
    )
}

export default Header