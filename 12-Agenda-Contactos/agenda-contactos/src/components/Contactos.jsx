import React, { useReducer } from 'react'
import { ContactosReducer } from '../reducers/ContactosReducer'
import FormularioADD from './FormularioADD'
import TablaContactos from './TablaContactos'

const contactos = [
    {
        id: 'ash3kasd0',
        nombre: 'David',
        numero: '1234'
    },
    {
        id: 'asdas7as0',
        nombre: 'David',
        numero: '1234'
    }
]
const Contactos = () => {
    const [state, dispatch] = useReducer(ContactosReducer, contactos)

    return (
        <div className="container mt-3">
            <FormularioADD dispatch={dispatch} />
            <TablaContactos contactos={state} />
        </div>
    )
}

export default Contactos
