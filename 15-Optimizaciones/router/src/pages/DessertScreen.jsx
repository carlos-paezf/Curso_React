import React from 'react'
import Card from '../components/Card'
import { Foods } from '../models/foods'

const DessertScreen = () => {

    const desert = Foods.filter(f => f.categoria === "B")

    return (
        <div className="container-fluid mt-3">
            <h1>Dessert Screen</h1>
            <hr />
            <div className="row">
            {
                desert.map(dish => 
                    <Card key={dish.id} {...dish} />
                )
            }
            </div>
        </div>
    )
}

export default DessertScreen
