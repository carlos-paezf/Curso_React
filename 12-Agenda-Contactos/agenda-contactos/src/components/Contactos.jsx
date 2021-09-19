import React, { useEffect, useReducer } from 'react'
import { ContactosReducer } from '../reducers/ContactosReducer'
import FormularioADD from './FormularioADD'
import TablaContactos from './TablaContactos'

const init = () => {
    const contactos = localStorage.getItem('contactos')
    return contactos ? JSON.parse(contactos) : []
}


const Contactos = () => {
    const [state, dispatch] = useReducer(ContactosReducer, [], init)

    useEffect(() => {
        localStorage.setItem('contactos', JSON.stringify(state))
    }, [state])

    return (
        <div className="container mt-3">
            <FormularioADD dispatch={dispatch} />
            <TablaContactos contactos={state} dispatch={dispatch} />
        </div>
    )
}

export default Contactos
