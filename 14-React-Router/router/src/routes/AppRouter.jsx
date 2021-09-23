import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import DessertScreen from '../pages/DessertScreen'
import MeatScreen from '../pages/MeatScreen'
import SearchScreen from '../pages/SearchScreen'

const AppRouter = () => {
    return (
        <>
            <Switch>
                <Route exact path="/with-meat" component={ MeatScreen } />
                <Route exact path="/dessert" component={ DessertScreen } />
                <Route exact path="/search" component={ SearchScreen } />
                <Redirect to="/with-meat" />
            </Switch>
        </>
    )
}

export default AppRouter
