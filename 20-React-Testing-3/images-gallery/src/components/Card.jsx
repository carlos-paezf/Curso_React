import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ img }) => {
    return (
        <div aria-label="card-img" className="card m-3" style={{ width: "20rem" }}>
            <img src={img} className="card-img-top" alt="imagen.png" />
        </div>
    )
}

Card.propTypes = {
    img: PropTypes.string
}

export default Card
