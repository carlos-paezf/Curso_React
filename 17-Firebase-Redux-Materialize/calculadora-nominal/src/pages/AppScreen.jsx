import React from 'react'
import { useSelector } from 'react-redux'
import Element from '../components/Element'
import FormAdd from '../components/FormAdd'
import Navbar from '../components/Navbar'

const AppScreen = () => {

    const { auth } = useSelector(state => state)
    const nominaData = useSelector(state => state.nomina.nominaData)

    return (
        <>
            <Navbar />

            <div className="container">
                <h1 className="center">
                    Hola {auth.username}
                </h1>
                <hr />
                <FormAdd />

                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cantidad</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            nominaData.map((e, i) => <Element key={i} data={e} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppScreen
