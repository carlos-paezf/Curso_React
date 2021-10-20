import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase/config"

export const loadData = async (uid) => {
    const response = await getDocs(collection(db, `${uid}/nominas/nomina`))
    const data = []
    response.forEach((nomina) => {
        const nominaData = nomina.data()
        data.push({
            id: nomina.id,
            ...nominaData
        })
    })
    console.log(data)
    return data
} 