import React from 'react'

const LoginScreen = ({ history }) => {
    const handleLogin = () => {
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
