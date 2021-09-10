import React from 'react'
import { useMemorizeApp } from '../../hooks/useMemorizeApp'

const Memorize2 = () => {
    const [contador, funPesadaMemo, add, visibility]  = useMemorizeApp(3, 3)

    return (
        <>
            <h2>Custom Hook Practica</h2>
            <hr />
            <p>{ contador }</p>
            <button onClick={add}>Añadir</button>
            <button onClick={visibility}>Mostrar - Ocultar</button><br />
            <span>{ funPesadaMemo }</span>
        </>
    )
}

export default Memorize2
