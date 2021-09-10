import React from 'react'
import { useCounter } from '../hooks/useCounter'

const Custom = () => {
    const [counter, increment, decrement] = useCounter(10, 5)

    return (
        <>
            <h2>Custom Hook</h2>
            <hr />
            <p>{ counter }</p>
            <button onClick={increment}>+ rango</button>
            <button onClick={decrement}>- rango</button>
        </>
    )
}

export default Custom
