import React from 'react'
import { useDispatch } from 'react-redux'
import { borrarRegistro } from '../actions/nomina'

const Element = ({ data }) => {

    const { fecha, pago, id } = data

    const dispatch = useDispatch()

    let fechaFormato

    if (fecha.seconds) {
        const date = fecha.toDate()
        fechaFormato = date.toLocaleDateString()
    } else {
        fechaFormato = fecha
    }
    
    const handleDelete = () => {
        dispatch(borrarRegistro(id))
    }

    return (
        <tr>
            <td>{fechaFormato}</td>
            <td>{pago}</td>
            <td><button onClick={handleDelete} className="btn red">Borrar</button></td>
        </tr>
    )
}

export default Element
