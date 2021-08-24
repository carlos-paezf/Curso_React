/* import React from 'react'

export const Contador = () => {
    return (
        <div>
            <h1>Contador: 0</h1>
        </div>
    )
} */

import React, { useState } from 'react'

const Contador = ({inicial, factorDisminuir}) => {

    const [contador, setContador] = useState(inicial);

    const aumentar = () => setContador((actual) => actual + 1);
    const disminuir = () => setContador(contador - factorDisminuir);
    const reset = () => setContador((contador) => contador = inicial);

    return (
        <div>
            <h1>Contador: {contador}</h1>
            <hr />
            <button onClick={aumentar}>Aumentar</button>
            <button onClick={disminuir}>Disminuir</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Contador
