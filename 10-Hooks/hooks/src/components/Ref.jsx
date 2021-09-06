import React, { useRef } from 'react'

const Ref = () => {

    const ref = useRef(null)

    const handleRef = () => {
        ref.current.value = "Hola mundo"
        ref.current.select()
    }

    return (
        <>
            <h2 onClick={handleRef}>useRef</h2>
            <hr />
            <textarea ref={ref} placeholder="Escribe un mensaje..."></textarea>
        </>
    )
}

export default Ref
