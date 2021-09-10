import React, { memo } from 'react'

const BotonAdd = ({ add }) => {
    console.log('La función add se ejecuto')
    return <button onClick={add}>Aumentar</button>
}

export default memo(BotonAdd)
