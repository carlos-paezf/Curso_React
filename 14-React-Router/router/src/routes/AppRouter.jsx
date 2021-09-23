import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DessertScreen from '../pages/DessertScreen'
import DishScreen from '../pages/DishScreen'
import MainCourse from '../pages/MainCourse'
import SearchScreen from '../pages/SearchScreen'

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/main-course" component={ MainCourse } />
                <Route exact path="/dessert" component={ DessertScreen } />
                <Route exact path="/search" component={ SearchScreen } />
                <Route exact path="/dish/:idFood" component={ DishScreen } />

                {/* <Redirect to="/main-course" /> */}
            </Switch>
        </>
    )
}

export default AppRouter
