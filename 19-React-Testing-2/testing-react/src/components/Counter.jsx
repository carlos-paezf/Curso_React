import { useCounter } from '../hooks/useCounter'
import ButtonCounter from './ButtonCounter'

const Counter = () => {

    const { state, handleModifyCounter } = useCounter()

    return (
        <>
            <h2 data-testid="counter" role="counter">Counter: {state}</h2>

            <ButtonCounter name='Aumentar +1' action={handleModifyCounter} value={1} aria='aumentar' />
            <ButtonCounter name='Disminuir +1' action={handleModifyCounter} value={-1} aria='disminuir' />
            <ButtonCounter name='Resetear Contador' action={handleModifyCounter} value={-state} aria='reset' />
        </>
    )
}

export default Counter
