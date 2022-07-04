import React, { Component } from 'react'
import Typewriter from 'typewriter-effect'
import Navbar from '../components/Navbar'
import '../style/Home.css'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
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
                    onClick={() => this.props.history.push('/signup')}
                  >
                    REGISTER
                  </button>{' '}
                  <button className='login-button' onClick={() => this.props.history.push('/login')}>
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
}
