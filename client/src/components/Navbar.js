import React from 'react'

function Navbar() {
  return (
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">DAPP</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="mx-auto">
                    <ul class="navbar-nav">
                        {/* <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li> */}
                        <li class="nav-item">
                        <a class="nav-link" href="/contest">CONTESTS</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/login">LOGIN</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/signup">SIGNUP</a>
                        </li>
                        {/* <li class="nav-item">
                        <a class="nav-link" href="/">FAQ</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar