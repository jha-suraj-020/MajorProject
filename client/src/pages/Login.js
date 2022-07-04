import React from 'react'
import '../style/Login.css'

function Login() {
  return (
    <div>
        <input id='public-id'
            class="form-control form-control-lg" 
            type="text" 
            placeholder="PUBLIC ID" 
            aria-label=".form-control-lg example"/>
    </div>
  )
}

export default Login