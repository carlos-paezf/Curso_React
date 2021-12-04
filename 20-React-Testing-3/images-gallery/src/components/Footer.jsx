import React from 'react'

const Footer = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <span className="position-absolute top-50 start-50 translate-middle" style={{color: "white"}}>
                David Ferrer &copy; {new Date().getFullYear()}
            </span>
        </nav>
    )
}

export default Footer
