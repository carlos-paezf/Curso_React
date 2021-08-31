export const operacionesHelper = (numeros, setNumeros) => {
    const { numero1, numero2 } = numeros;

    const handleChange = (e) => {
        setNumeros({
            ... numeros, 
            [e.target.name]: parseFloat(e.target.value),
        })
    }
    
    const operacion = (operador) => {
        let res;
        switch (operador) {
            case "+": res = numero1 + numero2; break;
            case "-": res = numero1 - numero2; break;
            case "*": res = numero1 * numero2; break;
            case "/": res = numero1 / numero2; break;
            default: break;
        }
        return res;
    }

    return { handleChange, operacion, numero1, numero2 }
}