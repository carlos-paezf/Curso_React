import React, { useState } from 'react'
import { operacionesHelper } from '../../helpers/operaciones'
import Resultado from './Resultado'

const NumberInput = () => {

    const [numeros, setNumeros] = useState({
        n1: 0, n2: 0
    })

    const { handleChange, operacion, n1, n2 } = operacionesHelper(numeros, setNumeros)

    return (
        <>
            <label className="mx-2">
                Número 1: <input type="number" name="n1" value={n1} onChange={handleChange} />
            </label><br />
            <label className="mx-2">
                Número 2: <input type="number" name="n2" value={n2} onChange={handleChange} />
            </label>

            <Resultado operacion="Suma" resultado={operacion("+")} />
            <Resultado operacion="Resta" resultado={operacion("-")} />
            <Resultado operacion="Multiplicación" resultado={operacion("*")} />
            <Resultado operacion="División" resultado={operacion("/")} />

        </>
    )
}

export default NumberInput
