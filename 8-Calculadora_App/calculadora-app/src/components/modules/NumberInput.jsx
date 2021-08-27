import React, { useState } from 'react'

const NumberInput = () => {

    const [numeros, setNumeros] = useState({
        numero1: 0,
        numero2: 0
    })

    const { numero1, numero2 } = numeros

    const handleChange = (e) => {
        setNumeros({
            ... numeros, 
            [e.target.name]: parseFloat(e.target.value),
        })
    }

    return (
        <>
            <label>
                Número 1: <input name="numero1" value={numero1} type="number" onChange={handleChange} />
            </label><br />
            <label>
                Número 2: <input name="numero2" value={numero2} type="number" onChange={handleChange} />
            </label><br />
        </>
    )
}


export default NumberInput
