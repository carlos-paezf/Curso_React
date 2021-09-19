import React from 'react'

const TablaContactos = ({ contactos, dispatch }) => {

    const handleDelete = (id) => {
        const actionDelete = {
            type: 'delete',
            payload: id
        }
        dispatch(actionDelete)
    }


    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Número</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {contactos.map(contacto => {
                    const finalID = contacto.id.split("-")
                    return (
                        <tr key={contacto.id}>
                            <th>{ finalID[0] }</th>
                            <td>{ contacto.nombre }</td>
                            <td>{ contacto.numero }</td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={() => handleDelete(contacto.id)}>
                                    Eliminar &nbsp;
                                    <i className="bi bi-trash2" />
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TablaContactos
