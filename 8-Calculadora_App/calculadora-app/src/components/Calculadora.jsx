import React, { useState } from 'react'
import NumberInput from './modules/NumberInput';
import Resultado from './modules/Resultado';

const Calculadora = () => {

    const [suma, setSuma] = useState(0);

    return (
        <div>
            <NumberInput />

            <Resultado operacion="Suma" resultado={suma} />
            <Resultado operacion="Resta" resultado={suma} />
            <Resultado operacion="Multiplicación" resultado={suma} />
            <Resultado operacion="División" resultado={suma} />
        </div>
    )
}

export default Calculadora
