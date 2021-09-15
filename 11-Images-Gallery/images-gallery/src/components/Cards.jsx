import React, { useCallback, useEffect, useState } from 'react'
import Card from './Card'

const Cards = () => {
    
    const [images, setImages] = useState([])
    const [input, setInput] = useState("")
    
    const peticion = useCallback(
        async () => {
            const accessKey = "client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU"
            let route = `https://api.unsplash.com/photos/?${accessKey}`
            if (input !== "") {
                route = `https://api.unsplash.com/search/photos/?query=${encodeURI(input)}&${accessKey}`
            }
            const res = await fetch(route)
            const data = await res.json()
            if (data.results) {
                setImages(data.results)
            } else {
                setImages(data)
            }
        },
        [input]
    )

    useEffect(() => {
        peticion()
    }, [peticion])

    // console.log(images.urls.regular)


    const handleSubmit = (e) => {
        e.preventDefault()
        const text = e.target[0].value
        setInput(text)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Buscar:
                    <input type="text" name="inputText" id="inputText" />
                </label>
            </form>
            <hr />
            {images.map((img) => <Card key={img.id} img={img.urls.regular} />)}
        </>
    )
}

export default Cards
