import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'

const AuthRouter = () => {
    return (
        <Switch>
            <Route exact path="/auth/login" component={LoginScreen} />
            <Route exact path="/auth/register" component={RegisterScreen} />
        </Switch>
    )
}

export default AuthRouter
