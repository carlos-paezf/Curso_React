import React, { useCallback, useMemo, useState } from 'react'
import BotonAdd from './BotonAdd'
import Dato from './Dato'

const Memorize = () => {
    const [contador, setContador] = useState(0)
    const [view, setView] = useState(true)

    /* const handleAdd = () => {
        setContador(contador + 1)
    } */

    const handleAdd = useCallback(() => {
        setContador(actual => actual + 1)
    }, [setContador])

    /* const funPesada = (iteracion) => {
        for (let i = 0; i < iteracion; i++) {
            console.log('procesando')
        }
        return 'Fin del proceso'
    }

    const funPesadaMemo = useMemo(() => funPesada(contador), [contador]) */

    return (
        <>
            <h2>useMemo</h2>
            <hr />
            <p>Contador: <Dato value={contador} /> </p>
            {/* { funPesadaMemo } */}
            <BotonAdd add={handleAdd} />
            <button onClick={() => setView(!view)}>Ver - Quitar</button>
        </>
    )
}

export default Memorize
