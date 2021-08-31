import React, { useState } from 'react'
import { operacionesHelper } from '../../helpers/operaciones'
import Resultado from './Resultado'

const NumberInput = () => {
    const [numeros, setNumeros] = useState({
        numero1: 0,
        numero2: 0
    })

    const { handleChange, operacion, numero1, numero2 } = operacionesHelper(numeros, setNumeros)

    return (
        <>
            <label className="mx-2">
                Número 1: <input name="numero1" value={numero1} type="number" onChange={handleChange} />
            </label><br />
            <label className="mx-2">
                Número 2: <input name="numero2" value={numero2} type="number" onChange={handleChange} />
            </label><br />

            <Resultado operacion="Suma" resultado={operacion("+")} />
            <Resultado operacion="Resta" resultado={operacion("-")} />
            <Resultado operacion="Multiplicación" resultado={operacion("*")} />
            <Resultado operacion="División" resultado={operacion("/")} />
        </>
    )
}


export default NumberInput
