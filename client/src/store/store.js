import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./reducers"


export default function configureAppStore(preloadedState) {

    return configureStore({
      
		reducer: rootReducer,
		preloadedState
    })
}