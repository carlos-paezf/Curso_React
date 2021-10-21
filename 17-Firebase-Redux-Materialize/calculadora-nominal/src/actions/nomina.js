import { addDoc, collection } from "@firebase/firestore"
import { db } from "../firebase/config"
import { types } from "../types/types"


export const crearRegistro = (pago) => {
    return async (dispatch, getState) => {
        const { id } = getState().auth

        const datos = {
            fecha: new Date().toLocaleDateString(),
            pago: pago
        }

        const referencia = await addDoc(collection(db, `${id}/nominas/nomina`), datos)
        
        const idData = await referencia.id
        const newData = {
            ...datos,
            idData
        }

        dispatch(crear(newData))
    }
}


export const leerRegistros = (data) => {
    return {
        type: types.nominaRead,
        payload: data
    }
} 


export const crear = (data) => {
    return {
        type: types.nominaAdd,
        payload: data,
    }
}