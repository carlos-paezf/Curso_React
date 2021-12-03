import React from 'react'

const ButtonCounter = ({ name, value, action, aria}) => {
    return (
        <button aria-label={aria} onClick={() => action(value)}>{name}</button>
    )
}

export default ButtonCounter
