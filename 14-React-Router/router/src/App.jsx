import React, { useEffect, useReducer } from 'react'
import LoginRouter from './routes/LoginRouter'
import { AuthContext } from './context/AuthContext'
import { AuthReducer } from './reducers/AuthReducer'


const init = () => {
    return JSON.parse(localStorage.getItem('log')) || { log: false }
}

const App = () => {
    const [state, dispatch] = useReducer(AuthReducer, [], init)

    useEffect(() => {
        localStorage.setItem('log', JSON.stringify(state))
    }, [state])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            <LoginRouter />
        </AuthContext.Provider>
    )
}

export default App
