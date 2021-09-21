import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const About = () => {
    const { user } = useContext(UserContext)

    return (
        <div className="container text-center mt-5">
            <h1>Página de About</h1>
            {!user
                ? <h2><Link to="/" className="text-danger">Inicia Sesión</Link></h2>
                : <div>
                    <h2>{user.data.first_name} {user.data.last_name}</h2>
                    <p>Email: {user.data.email}</p>
                    <img src={user.data.avatar} alt={user.data.id} width="100px" height="100px" />
                </div>}
        </div>
    )
}

export default About
