import React, { useEffect, useReducer, useState } from 'react'
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

    const [formView, setFormView] = useState(false)

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-9">
                    <TablaContactos contactos={state} dispatch={dispatch} />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-outline-info mb-3" onClick={_ => setFormView(!formView)}>
                        {
                            formView
                                ? <i class="bi bi-arrows-angle-contract">&nbsp;Ocultar Formulario</i>
                                : <i class="bi bi-arrows-angle-expand">&nbsp;Agregar Contacto</i>
                        }
                    </button>
                    {formView && <FormularioADD dispatch={dispatch} />}
                </div>
            </div>
        </div>
    )
}

export default Contactos
