import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
            const { data: item, actionType, notify } = action.payload;

            if (notify) state.itemAdded = true;

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
        updateItemOptions: (state: any, action: PayloadAction<{ data: any[]; itemId: number; }>) => {
            const optionsData = action.payload.data;
            const itemId = action.payload.itemId;

            const existingItemIndex = state.items.findIndex(
                (i: any) => i.itemId === itemId
            );

            if (existingItemIndex !== -1) {
                // If item exists, update the options
                state.items[existingItemIndex] = {
                    ...state.items[existingItemIndex],
                    options: optionsData
                };

                saveStorage(state.items, "cartItems");
            }
        },
        updateItemSize: (state: any, action: PayloadAction<{ data: any[]; itemId: number; }>) => {
            const sizeData = action.payload.data;
            const itemId = action.payload.itemId;

            const existingItemIndex = state.items.findIndex(
                (i: any) => i.itemId === itemId
            );

            if (existingItemIndex !== -1) {
                // If item exists, update the options
                state.items[existingItemIndex] = {
                    ...state.items[existingItemIndex],
                    size: sizeData
                };

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

export const getCartCustomizeOptions = (itemId: number, cartList: CartItemDetails[]) => {
    const getOptions = cartList.find((d) => d.itemId === itemId);
    return getOptions?.options || [];
};

export const getCartSize = (itemId: number, cartList: CartItemDetails[]) => {
    const getSize = cartList.find((d) => d.itemId === itemId);
    return getSize?.size || [];
};

export const getItemInCart = (itemId: number, cartItemIds: number[]) => {
    return cartItemIds.includes(itemId)
};

export const cartItemIds = createSelector(
    [
        (state: { cart: CartState }) => state.cart.items
    ],
    (items) => {

        return items.map((item: CartItemDetails) => item.itemId);
    }
)

export const { setItems, updateItemOptions, hideCartNotification, recoverCart, removeFromCart, resetCart, setInstructionText, setCartLoading, updateItemSize } = cartSlice.actions

export const cartItemList = (state: { cart: CartState }) => state.cart.items;
export const itemAdded = (state: { cart: CartState }) => state.cart.itemAdded;
export const instructionText = (state: { cart: CartState }) => state.cart.instructionText;
export const cartLoading = (state: { cart: CartState }) => state.cart.loading;

export const getCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((total: number, item: CartItemDetails) => {
        // Calculate the base total for the item (final price * quantity)
        const baseTotal = (+item.finalPrice || 0) * item.qty;

        // Calculate the sum of all checked options' prices
        const optionsTotal = item?.options?.reduce((optTotal, variant) => {
            const checkedOptionsPrice = variant.variantAttributes
                .filter((opt: { checked: any; }) => opt.checked)
                .reduce((sum: number, opt: { price: string | number; }) => sum + (+opt.price || 0), 0);
            return optTotal + checkedOptionsPrice;
        }, 0);

        // Add the options total multiplied by item quantity to the base total
        return total + baseTotal + (optionsTotal * item.qty);
    }, 0);

export const getCartOptionsTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((total: number, item: CartItemDetails) => {
        // Calculate the base total for the item (final price * quantity)
        const baseTotal = 0;

        // Calculate the sum of all checked options' prices
        const optionsTotal = item?.options?.reduce((optTotal, variant) => {
            const checkedOptionsPrice = variant.variantAttributes
                .filter((opt: { checked: any; }) => opt.checked)
                .reduce((sum: number, opt: { price: string | number; }) => sum + (+opt.price || 0), 0);
            return optTotal + checkedOptionsPrice;
        }, 0);

        // Add the options total multiplied by item quantity to the base total
        return total + baseTotal + (optionsTotal * item.qty);
    }, 0);

export default cartSlice.reducer;