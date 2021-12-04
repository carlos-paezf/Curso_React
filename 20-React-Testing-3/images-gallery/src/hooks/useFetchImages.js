import { useCallback, useEffect, useState } from "react"
import axios from "axios"

export const useFetchImages = () => {
    const [images, setImages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(true)

    const peticion = useCallback(
        async () => {
            const accessKey = "client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU"
            let route = `https://api.unsplash.com/photos/?${accessKey}`
            if (input !== "") {
                route = `https://api.unsplash.com/search/photos/?query=${encodeURI(input)}&${accessKey}`
            }
            setLoading(true)
            const {data} = await axios.get(route)
            if (data) {
                setImages(data)
            } else {
                setImages([])
            }
            setLoading(false)
        },
        [input]
    )

    useEffect(() => {
        peticion()
        setInput("")
    }, [peticion])

    // console.log(images.urls.regular)

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = e.target[0].value
        setInput(text)
    }

    return [handleSubmit, loading, images]
}
