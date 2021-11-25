import { useState } from "react"

export const useCounter = () => {
    const [state, setState] = useState(0)

    const handleModifyCounter = (value = 1) => {
        setState(state + value) 
    }

    return { state, handleModifyCounter }
}
