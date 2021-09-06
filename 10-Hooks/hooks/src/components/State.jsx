import React, { useState } from 'react'

const State = () => {
    const [state, setState] = useState(0)

    /* console.log(state)

    setInterval(() => {
        setState(setState + 1)
    })

    setInterval(() => {
        setState(state + 1)
    }, 3000) */

    return (
        <div className="container text-center">
            <h2>useState</h2>
            <hr />
            Contador del estado = {state}
        </div>
    )
}

export default State
