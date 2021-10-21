import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/auth'
import { limpiar } from '../actions/nomina'

const Navbar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(limpiar())
        dispatch(logout())
    }

    return (
        <nav>
            <div className="nav-wrapper black">
                <span className="brand-logo">Calculadora Nominal</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <button onClick={handleLogout} className="btn deep-purple waves-effect waves-light">Logout</button>
                    </li>
                </ul>
            </div>  
        </nav>
    )
}

export default Navbar
