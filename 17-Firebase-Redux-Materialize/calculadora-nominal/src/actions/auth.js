import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "@firebase/auth"
import { googleAuthProvider } from "../firebase/config"
import { types } from "../types/types"

const auth = getAuth()


export const googleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => dispatch(login(user.uid, user.displayName)))
    }
}


export const register = (email, username, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(auth.currentUser, { displayName: username })
                dispatch(login(user.uid, user.displayName))
            })
    }
}


export const emailAndPasswordLogin = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}


export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            id: uid, username: displayName
        }
    }
}