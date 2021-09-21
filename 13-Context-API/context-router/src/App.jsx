import React, { useState } from 'react'
import { UserContext } from './context/userContext'
import AppRouter from './routes/AppRouter'

const App = () => {
    const [user, setUser] = useState(null)
    const state = {user, setUser}

    return (
        <UserContext.Provider value={state}>
            <AppRouter />
        </UserContext.Provider>
    )
}

export default App
