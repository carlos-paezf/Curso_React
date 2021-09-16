import React from 'react'
import { useFetchImages } from '../hooks/useFetchImages'
import Card from './Card'
import FormIMG from './FormIMG'
import Loading from './Loading'

const Cards = () => {

    const [handleSubmit, loading, images] = useFetchImages()

    return (
        <div>
            <FormIMG handleSubmit={handleSubmit}/>
            <hr />

            <div className="text-center">
                {loading && <Loading />}
            </div>

            <div className="row">
                {images.map((img) => {
                    return <div key={img.id} className="col">
                        <Card img={img.urls.regular} />
                    </div>
                })}
            </div>
        </ div>
    )
}

export default Cards
