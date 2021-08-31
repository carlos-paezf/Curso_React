import React from 'react'
import PropTypes from 'prop-types'

const Resultado = ({operacion, resultado}) => {
    return (
        <div className="m-2">
            <span>
                {operacion} = {resultado}
            </span>
            <br />
        </div>
    )
}

Resultado.propTypes = {
    operacion: PropTypes.string,
    resultado: PropTypes.number
}

export default Resultado
