import React, { useEffect, useState } from 'react'
import Card from './Card'

const Cards = () => {

    const [images, setImages] = useState({
        urls: {
            regular: {}
        }
    })

    const peticion = async () => {
        const res = await fetch("https://api.unsplash.com/photos/random/?client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU")
        const data = await res.json()
        setImages(data)
    }

    useEffect(() => {
        peticion()
    }, [])

    // console.log(images.urls.regular)

    return (
        <>
            <Card img={images.urls.regular} />
        </>
    )
}

export default Cards
