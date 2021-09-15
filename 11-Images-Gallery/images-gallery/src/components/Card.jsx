import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ key, img }) => {
    return (
        <div className="card" style={{ width: "15rem" }}>
            <img src={img} className="card-img-top" alt="imagen.png" />
        </div>
    )
}

Card.propTypes = {
    key: PropTypes.string,
    img: PropTypes.string
}

export default Card
