import React, { useLayoutEffect, useState } from 'react'

const LayoutEffect = () => {
    const [data, setData] = useState([])

    const efecto = data.length

    const newData = [
        {
            name: "nombre falso",
            email: "email@correo.com"
        },
        {
            name: "nombre falso",
            email: "email@correo.com"
        },
        {
            name: "nombre falso",
            email: "email@correo.com"
        },
        {
            name: "nombre falso",
            email: "email@correo.com"
        }
    ]

    useLayoutEffect(() => {
        setTimeout(() => {
            setData(newData)
        }, 3000)
    }, [])

    return (
        <>
            <h2>useLayoutEffect</h2>
            <hr />
            <p>Número de elementos en la data: { efecto }</p>
        </>
    )
}

export default LayoutEffect
