import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const Navbar = () => {

    const history = useHistory()
    const handleLogout = () => {
        history.replace("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <h1 className="navbar-brand">React-Router-Dom</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink activeClassName="text-danger" className="nav-link" aria-current="page" to="/main-course">Main Course</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="text-primary" className="nav-link" to="/dessert">Dessert</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="text-success" className="nav-link" to="/search">Search</NavLink>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
