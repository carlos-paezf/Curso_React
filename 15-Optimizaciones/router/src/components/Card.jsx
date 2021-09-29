import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, nombre, descripcion, categoria }) => {

    const pathIMG = `/assets/${id}.png`

    return (
        <div className="col-12 col-md-4">
            <div className="card mb-3" style={{maxWidth: "600px"}} >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={pathIMG} className="img-fluid rounded-start" alt={ id } />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{ nombre }</h5>
                            <p className="card-text">{ descripcion }</p>
                            {
                                categoria === "A"
                                ? <p className="card-text"><small className="text-muted">Main Course</small></p>
                                : <p className="card-text"><small className="text-muted">Desserts</small></p>
                            }
                            <Link className="card-link" to={`/dish/${id}`}>More...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
