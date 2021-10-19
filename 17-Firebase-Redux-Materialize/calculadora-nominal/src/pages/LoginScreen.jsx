import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emailAndPasswordLogin, googleLogin } from '../actions/auth'

const LoginScreen = () => {

    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: '',
        username: '',
    })

    const { email, password } = data

    const handleChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const handleGoogleLogin = () => {
        dispatch(googleLogin())
    }

    const handleEmailLogin = (e) => {
        e.preventDefault()
        if (email.trim() === '' || !email.trim().includes('@')) return 
        if (password.trim().length < 8) return 
        dispatch(emailAndPasswordLogin(email, password))
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <hr />
            <div className="row">
                <form onSubmit={handleEmailLogin} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input onChange={handleChange} value={email} name="email" id="icon_prefix1" className="materialize-textarea" type="email" />
                            <label htmlFor="icon_prefix1">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <input onChange={handleChange} value={password} name="password" id="icon_prefix2" className="materialize-textarea" type="password"/>
                            <label htmlFor="icon_prefix2">Password</label>
                        </div>
                    </div>

                    <button type="submit" className="btn waves-effect waves-light green">Enviar <i className="material-icons right">send</i></button>
                    
                    <hr />
                    <GoogleButton onClick={handleGoogleLogin} />
                    <Link to="/auth/register">Register in the platform</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen
