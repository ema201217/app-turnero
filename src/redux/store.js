import {configureStore} from '@reduxjs/toolkit';
import reservaReducer from './reducers/reservaReducer'
export default configureStore({
    reducer:{
        reserva: reservaReducer,
    }
})