import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import queryString from 'query-string'
import { Foods } from '../models/foods'
import Card from '../components/Card'

const SearchScreen = ({ history }) => {

    const [inputValue, setInputValue] = useState("")
    const [foods, setFoods] = useState([])

    const handleChange = (e) => {
        const value = e.target.value
        setInputValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`?q=${inputValue}`)
    }

    const location = useLocation()
    const { q = '' } = queryString.parse(location.search)

    const getFoods = () => {
        if (inputValue.trim() !== '') {
            const value = inputValue.toLowerCase()
            const coincidence = Foods.filter(f => f.nombre.toLowerCase().includes(value))
            setFoods(coincidence)
        } else {
            setFoods([])
        }
    }

    useEffect(() => {
        getFoods()
    }, [q])

    return (
        <div className="container-fluid mt-3">
            <h1>Search Screen</h1>
            <hr />
            <div className="row g-3 align-items-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <label className="col-form-label">
                                Dish:
                            </label>
                        </div>
                        <div className="col-auto">
                            <input className="form-control" type="text" placeholder="Name Dish" autoComplete="off" value={inputValue} onChange={handleChange} />
                        </div>
                        <div className="col-auto my-3">
                            <button type="submit" className="btn btn-outline-success">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-8">
                    <h2>Results: { foods.length }</h2>
                    {
                        foods.length === 0 && <div className="alert alert-warning text-center">Please, search another food</div>
                    }
                    {
                        foods.map(f => <Card key={f.id} {...f} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchScreen
