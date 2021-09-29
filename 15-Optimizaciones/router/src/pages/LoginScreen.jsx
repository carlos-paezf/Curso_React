import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { authTypes } from '../types/authTypes'

const LoginScreen = () => {
    const history = useHistory()
    
    const { dispatch } = useContext(AuthContext)

    const handleLogin = () => {
        dispatch({ type: authTypes.login })
        history.push("/search")
    }

    return (
        <div className="container mt-5 text-center">
            <img src="/assets/animation.gif" alt="animation" />
            <h1 className="my-3">Login Screen</h1>
            <button className="btn btn-oultine-dark" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginScreen
