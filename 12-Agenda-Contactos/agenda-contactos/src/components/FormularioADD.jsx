import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

const FormularioADD = ({ dispatch }) => {
    const [data, setData] = useState({
        nombre: '',
        numero: ''
    })

    const { nombre, numero } = data

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : [e.target.value]
        })
    }
    
    const actionAdd = {
        type: 'add', 
        payload: {
            id: uuidV4(),
            nombre,
            numero
        }
    }

    const handleAdd = () => {
        dispatch(actionAdd)
    }

    return (
        <>
            <div className="container">
                <label className="mx-1 d-grid gap-2">
                    Nombre:
                    <input type="text" className="form-control" 
                        name="nombre" id="nombre" 
                        value={nombre} 
                        onChange={handleChange} autoComplete="off" />
                </label>
                <label className="mx-1 d-grid gap-2">
                    Número:
                    <input type="text" className="form-control" 
                        name="numero" id="numero" 
                        value={numero} 
                        onChange={handleChange} autoComplete="off" />
                </label>
                <div className="mx-1 d-grid gap-2">
                    <button className="btn btn-outline-success mt-2" onClick={handleAdd}>
                        Agregar &nbsp;
                        <i className="bi bi-person-plus" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default FormularioADD
