import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect'
import Navbar from '../components/Navbar'
import '../style/Home.css'


function Home () {
  const history = useNavigate();

  return (
      <div>
        <Navbar/>
        <div className="container" style={{padding: "10rem 3rem"}}>
            <div className='row'>
              <div className='col'>
                <div className="home-text">
                  <h1 className='display-1'>Public Voting</h1>
                  <br />
                  <div className="typewriter">
                    <Typewriter
                      options={{
                        autoStart: true,
                        loop: true,
                        delay: 80,
                        deleteSpeed: 15,
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString('Trustable, Transparent and Digitized Platform')
                          .pauseFor(300)
                          .deleteChars(45)
                          .typeString('Open for all! Register Now.')
                          .pauseFor(300)
                          .start()
                      }}
                    />
                  </div>
                  <hr
                    style={{
                      border: '8px solid #fff',
                      width: '150px',
                      marginLeft: '0px',
                    }}
                  />
                </div>
                <div className="home-button">
                  <button className="register-button"
                    style={{ marginRight: '15px' }}
                    onClick={() => history('/signup')}
                  >
                    REGISTER
                  </button>{' '}
                  <button className='login-button' onClick={() => history('/login')}>
                    LOGIN
                  </button>
                </div>
              </div>
              <div className='col'>
                <img src="http://localhost:3000/voting.png" class="img-fluid" alt="..."/>
              </div>
            </div>
          </div>
      </div>
  )
}

export default Home