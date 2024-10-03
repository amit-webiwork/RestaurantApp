import { createSlice } from '@reduxjs/toolkit'
import { getCategoryList, getItemList } from '../../utils/ApiCall';
import { AppDispatch } from '../store';

interface CartState {
    items: Array<{ id: number }>;
    itemAdded: boolean;
}

const initialState: CartState = {
    items: [],
    itemAdded: false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setItems: (state: any, action) => {
            // state.items = [...state.items, action.payload]
            state.itemAdded = true

            state.items.push(action.payload);
            // state.itemAdded++;
        },
        hideCartNotification: (state, action) => {
            state.itemAdded = false
        },
    },
})

export const { setItems, hideCartNotification } = cartSlice.actions

export const cartItemList = (state: { cart: CartState }) => state.cart.items;
export const itemAdded = (state: { cart: CartState }) => state.cart.itemAdded;

export default cartSlice.reducer;