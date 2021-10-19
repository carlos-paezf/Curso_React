import React from 'react'
import { useSelector } from 'react-redux'
import FormAdd from '../components/FormAdd'
import Navbar from '../components/Navbar'

const AppScreen = () => {

    const { auth } = useSelector(state => state)
    
    return (
        <>
            <Navbar />

            <div className="container">
                <h1 className="center">
                    Hola { auth.username }
                </h1>
                <hr />
                <FormAdd />
            </div>
        </>
    )
}

export default AppScreen
