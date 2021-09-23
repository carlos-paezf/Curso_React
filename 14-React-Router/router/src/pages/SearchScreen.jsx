import React, { useState } from 'react'

const SearchScreen = ({ history }) => {

    const [inputValue, setInputValue] = useState("")

    const handleChange = (e) => {
        const value = e.target.value
        setInputValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`?q=${inputValue}`)
    }

    return (
        <div className="container-fluid mt-3">
            <h1>Search Screen</h1>
            <hr />
            <div className="row g-3 align-items-center">
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
        </div>
    )
}

export default SearchScreen
