import React from 'react'
import { BrowserRouter as BRouter, Switch, Route } from 'react-router-dom'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'

const AuthRouter = () => {
    return (
        <BRouter>
            <Switch>
                <Route exact path="/login" component={LoginScreen}/>
                <Route exact path="/register" component={RegisterScreen} />
            </Switch>
        </BRouter>
    )
}

export default AuthRouter
