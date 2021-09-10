import { useState, useMemo, useCallback } from 'react'

export const useMemorizeApp = (initialValue = 0, rango = 1) => {
    const [contador, setContador] = new useState(initialValue)
    const [view, setView] = new useState(true)

    const funPesada = (ite) => {
        for (let i = 0; i < ite; i++) {
            console.log("procesando")
        }
        return "fin del proceso"
    }

    const funPesadaMemo = useMemo(() => funPesada(contador), [contador])

    const add = useCallback(() => {
        setContador((actual) => actual + rango)
    }, [setContador])

    const visibility = useCallback(() => setView(!view), [setView])

    return [contador, funPesadaMemo, add, visibility]
}
