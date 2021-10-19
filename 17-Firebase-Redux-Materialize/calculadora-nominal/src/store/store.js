import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer'
import thunk from 'redux-thunk'
import { nominaReducer } from '../reducers/nominaReducer'


const reducers = combineReducers({
    auth: authReducer,
    nomina: nominaReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)