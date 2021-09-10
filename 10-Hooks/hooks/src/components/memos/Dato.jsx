import { memo } from 'react'

const Dato = ({value}) => {
    console.log('Me acabo de renderizar')
    return <>{ value }</>
}

export default memo(Dato)
