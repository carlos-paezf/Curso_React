import React from 'react'
import Card from '../components/Card'
import { Foods } from '../models/foods'

const MainCourse = () => {

    const mainCourse = Foods.filter(f => f.categoria === "A")

    return (
        <div className="container-fluid mt-3">
            <h1>Main Course Screen</h1>
            <hr />
            <div className="row">
            {
                mainCourse.map(dish => 
                    <Card key={dish.id} {...dish} />
                )
            }
            </div>
        </div>
    )
}

export default MainCourse
