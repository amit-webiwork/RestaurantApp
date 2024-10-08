import { configureStore } from '@reduxjs/toolkit';

import profileSlice from './features/profile';
import dialogSlice from './features/customDialog'
import itemSlice from './features/items'
import cartSlice from './features/cart'

const store = configureStore({
    reducer: {
        profile: profileSlice,
        customDialog: dialogSlice,
        items: itemSlice,
        cart: cartSlice,
    }
})

// Get the type of our store variable
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']

export default store;