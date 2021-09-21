import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { userData } from '../helpers/userData'

const Home = () => {
    const { user, setUser } = useContext(UserContext)

    const handleLogin = () => {
        setUser(userData)
    }

    const handleLogout = () => {
        setUser(null)
    }

    return (
        <div className="container text-center mt-5">
            <h1>Página de Home</h1>
            {!user
                ? <button className="btn btn-outline-dark" onClick={handleLogin}>Login</button>
                : <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            }

        </div>
    )
}

export default Home
