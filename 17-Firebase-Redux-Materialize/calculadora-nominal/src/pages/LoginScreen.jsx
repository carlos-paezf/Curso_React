import React from 'react'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { googleLogin } from '../actions/auth'

const LoginScreen = () => {

    const dispatch = useDispatch()

    const handleGoogleLogin = () => {
        dispatch(googleLogin('124', 'Ferrer'))
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <hr />
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                            <label htmlFor="icon_prefix2">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                            <label htmlFor="icon_prefix2">Password</label>
                        </div>
                    </div>

                    <button type="submit" className="btn waves-effect waves-light green">Enviar <i className="material-icons right">send</i></button>
                    
                    <hr />
                    <GoogleButton onClick={handleGoogleLogin} />
                    <Link to="/register">Register in the platform</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen
