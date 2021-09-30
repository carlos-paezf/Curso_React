import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar'
const DessertScreen = lazy(() => import('../pages/DessertScreen'))
const DishScreen = lazy(() => import('../pages/DishScreen'))
const MainCourse = lazy(() => import('../pages/MainCourse'))
const SearchScreen = lazy(() => import('../pages/SearchScreen'))

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Suspense fallback={<h1>Loading...</h1>}>
                <Switch>
                    <Route exact path="/main-course" component={MainCourse} />
                    <Route exact path="/dessert" component={DessertScreen} />
                    <Route exact path="/search" component={SearchScreen} />
                    <Route exact path="/dish/:idFood" component={DishScreen} />

                    <Redirect to="/main-course" />
                </Switch>
            </Suspense>
        </>
    )
}

export default AppRouter
