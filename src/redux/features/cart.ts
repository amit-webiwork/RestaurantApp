import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveStorage } from '../../utils/Storage';

interface CartState {
    items: Array<CartItemDetails>;
    itemAdded: boolean;
    instructionText: string;
    loading: boolean;
}

const initialState: CartState = {
    items: [],
    itemAdded: false,
    instructionText: "",
    loading: false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setItems: (state: any, action: PayloadAction<{ data: CartItemDetails; actionType: string; notify: boolean }>) => {
            const notify = action.payload.notify;
            if (notify) {
                state.itemAdded = true
            }

            // state.items.push(action.payload);
            const item = action.payload.data;
            const actionType = action.payload.actionType;

            const existingItemIndex = state.items.findIndex(
                (i: any) => i.itemId === item.itemId
            );

            if (existingItemIndex !== -1) {
                // If item exists, update the quantity or other properties
                state.items[existingItemIndex] = {
                    ...state.items[existingItemIndex],
                    qty: actionType === "add" ? state.items[existingItemIndex].qty + item.qty : item.qty
                };

                saveStorage(state.items, "cartItems");
            } else {
                // If item doesn't exist, push new item
                state.items.push(item);
                saveStorage(state.items, "cartItems");
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.loading = true;
            state.items = state.items.filter((d) => d.itemId !== action.payload)
            saveStorage(state.items, "cartItems");

            state.loading = false;
        },
        recoverCart: (state, action: PayloadAction<Array<CartItemDetails>>) => {
            state.items = action.payload;
        },
        resetCart: (state) => {
            state.items = []
            saveStorage(state.items, "cartItems");
        },
        hideCartNotification: (state, action) => {
            state.itemAdded = false
        },
        setInstructionText: (state: any, action: PayloadAction<string>) => {
            state.instructionText = action.payload
        },
        setCartLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
})

export const getCartQty = (itemId: number, cartList: CartItemDetails[]) => {
    const getQty = cartList.find((d) => d.itemId === itemId);
    return getQty?.qty || 1;
};

export const { setItems, hideCartNotification, recoverCart, removeFromCart, resetCart, setInstructionText, setCartLoading } = cartSlice.actions

export const cartItemList = (state: { cart: CartState }) => state.cart.items;
export const itemAdded = (state: { cart: CartState }) => state.cart.itemAdded;
export const instructionText = (state: { cart: CartState }) => state.cart.instructionText;
export const cartLoading = (state: { cart: CartState }) => state.cart.loading;

export const getCartTotal = (state: { cart: CartState }) => state.cart.items.reduce((total: number, item: CartItemDetails) => total + ((+item.finalPrice || 0) * item.qty), 0)

export default cartSlice.reducer;