import React, { useEffect, useState } from 'react'
import { BrowserRouter as BRouter, Switch } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import PrivateRouter from './PrivateRouter'
import AppScreen from '../pages/AppScreen'
import AuthRouter from './AuthRouter'
import PublicRouter from './PublicRouter'


const AppRouter = () => {

    const auth = getAuth()
    const dispatch = useDispatch()

    const [log, setLog] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(login(user.uid, user.displayName))
                setLog(true)
            } else {
                setLog(false)
            }
        })
    }, [auth, dispatch])

    return (
        <BRouter>
            <Switch>
                <PublicRouter path="/auth" log={log} component={AuthRouter}/>
                <PrivateRouter exact path="/" log={log} component={AppScreen} />
            </Switch>
        </BRouter>
    )
}

export default AppRouter
