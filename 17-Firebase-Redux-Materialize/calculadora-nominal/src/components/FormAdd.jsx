import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { crearRegistro } from '../actions/nomina'

const FormAdd = () => {

    const dispatch = useDispatch()

    const [viewForm, setViewForm] = useState(false)
    const [cantidadPago, setCantidadPago] = useState({
        precioHora: 0,
        horas: 0
    })

    const handleAdd = () => {
        setViewForm(!viewForm)
    }

    const { precioHora, horas } = cantidadPago

    const handleChange = (e) => {
        setCantidadPago({
            ...cantidadPago,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        const cantidadFinal = horas * precioHora
        dispatch(crearRegistro(cantidadFinal))
        setCantidadPago({
            precioHora: 0,
            horas: 0
        })
    }

    return (
        <>
            <button onClick={handleAdd} className="btn red waves-effect waves-light">
                {
                    viewForm ? 'Cerrar Formulario' : 'Agregar Nomina'
                }
            </button>
            {
                viewForm && <div className="animate__animated animate__slideInDown">
                    <div className="input-field col s12">
                        <label htmlFor="icon_prefix1">Ingrese Pago por hora</label>
                        <input id="icon_prefix1" type="text" value={precioHora} name="precioHora" onChange={handleChange} />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="icon_prefix2">Ingrese cantidad de horas</label>
                        <input id="icon_prefix2" type="text" placeholder="Ingrese cantidad de Horas" value={horas} name="horas" onChange={handleChange} />
                    </div>
                    <button className="btn green waves-effect waves-light" onClick={handleSave}>
                        Calcular y Guardar
                    </button>
                </div>
            }
        </>
    )
}

export default FormAdd
