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
    }

    return (
        <>
            <button onClick={handleAdd} className="btn red waves-effect waves-light">
                {
                    viewForm ? 'Cerrar Formulario' : 'Agregar Nomina'
                }
            </button>
            {
                viewForm && <div>
                    <input type="text" placeholder="Ingresa cantidad de Pago por Hora" value={precioHora} name="precioHora" onChange={handleChange} />
                    <input type="text" placeholder="Ingrese cantidad de Horas" value={horas} name="horas" onChange={handleChange} />
                    <button className="btn green waves-effect waves-light" onClick={handleSave}>
                        Calcular y Guardar
                    </button>
                </div>
            }
        </>
    )
}

export default FormAdd
