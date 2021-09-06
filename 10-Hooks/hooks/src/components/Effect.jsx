import React, { useEffect, useState } from 'react'

const Effect = () => {
    const [ users, setUsers ] = useState([])
    const [id, setId] = useState(0)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    useEffect(() =>{
        console.log(users[id - 1])
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h2>useEffect</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Search</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Effect
