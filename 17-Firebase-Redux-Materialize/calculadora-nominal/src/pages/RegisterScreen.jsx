import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../actions/auth'

const RegisterScreen = () => {

    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const { email, username, password, confirmPassword } = data

    const handleChange = (e) => {
        const value = e.target.value
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (email.trim() === '' || !email.trim().includes('@')) return 
        if (username.trim().length < 5) return
        if (password.trim().length < 8) return 
        else { 
            if(password.trim() === confirmPassword.trim) return
        }

        dispatch(register(email, username, password))
    }

    return (
        <div className="container">
            <h1>Register</h1>
            <hr />
            <div className="row">
                <form onSubmit={handleRegister} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input onChange={handleChange} value={email} name="email" id="icon_prefix1" className="materialize-textarea" type="email" />
                            <label htmlFor="icon_prefix1">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">assignment_ind</i>
                            <input onChange={handleChange} value={username} name="username" id="icon_prefix2" className="materialize-textarea" type="text" />
                            <label htmlFor="icon_prefix2">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <input onChange={handleChange} value={password} name="password" id="icon_prefix3" className="materialize-textarea" type="password" />
                            <label htmlFor="icon_prefix3">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <input onChange={handleChange} value={confirmPassword} name="confirmPassword" id="icon_prefix4" className="materialize-textarea" type="password" />
                            <label htmlFor="icon_prefix4">Confirm Password</label>
                        </div>
                    </div>

                    <button type="submit" className="btn waves-effect waves-light green">Enviar <i className="material-icons right">send</i></button>

                    <hr />
                    <Link to="/login">Login into your account</Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
