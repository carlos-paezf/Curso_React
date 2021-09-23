import React from 'react'
import { useParams } from 'react-router'
import { Foods } from '../models/foods'

const DishScreen = ({ history }) => {
    const { idFood } = useParams()

    const { id, nombre, descripcion, categoria } = Foods.find(f => f.id === idFood)

    const pathIMG = `/assets/${id}.png`

    const handleBack = () => {
        history.goBack()
    }

    return (
        <div className="container-fluid row text-center my-5">
            <div className="col-12 col-md-8">
                <img src={pathIMG} alt={id} className="img-thumbnail my-3" style={{ width: "75%", maxHeight: "650px", maxWidth: "800px" }} />
            </div>
            <div className="col-12 col-md-4">
                <h2>Dish: {nombre}</h2>
                <hr />
                <div className="card">
                    <div className="card-header">
                        Description
                    </div>
                    <ul className="list-group list-group-flush">
                        <li class="list-group-item">{ descripcion }</li>
                    </ul>
                    <div className="card-header">
                        Category
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            categoria === "A"
                            ? <li class="list-group-item">Main Course</li>
                            : <li class="list-group-item">Desserts</li>
                        }
                    </ul>
                    <div className="card-header">
                        <button className="btn btn-outline-dark px-3" style={{borderRadius: "2rem"}} onClick={handleBack} >
                            <i class="bi bi-arrow-left-circle-fill" />&nbsp; Go Back
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DishScreen
